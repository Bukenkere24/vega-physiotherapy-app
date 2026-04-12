require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const { initDb } = require('./db');
const { sendContactNotification } = require('./mail');

const PORT = Number(process.env.PORT || 3001);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const isProd = process.env.NODE_ENV === 'production';

const db = initDb();

const insertContact = db.prepare(`
  INSERT INTO contact_submissions (full_name, phone, email, service_interest, message, source)
  VALUES (@full_name, @phone, @email, @service_interest, @message, @source)
`);

const insertPayment = db.prepare(`
  INSERT INTO payments (razorpay_order_id, amount_paise, currency, status, contact_name, contact_phone, contact_email, service_note)
  VALUES (@razorpay_order_id, @amount_paise, @currency, @status, @contact_name, @contact_phone, @contact_email, @service_note)
`);

const updatePaymentVerified = db.prepare(`
  UPDATE payments SET status = 'paid', razorpay_payment_id = @payment_id, razorpay_signature = @signature
  WHERE razorpay_order_id = @order_id
`);

const app = express();
app.set('trust proxy', 1);

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '64kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
});

function sanitize(str, max = 5000) {
  if (str == null) return '';
  const s = String(str).trim();
  return s.length > max ? s.slice(0, max) : s;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'vega-api' });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const body = req.body || {};
  const full_name = sanitize(body.full_name, 200);
  const phone = sanitize(body.phone, 40);
  const email = sanitize(body.email, 200);
  const service_interest = sanitize(body.service_interest, 200);
  const message = sanitize(body.message, 4000);
  const source = sanitize(body.source, 40) || 'contact';

  if (!full_name || !phone || !service_interest) {
    return res.status(400).json({ error: 'full_name, phone, and service_interest are required' });
  }

  try {
    insertContact.run({
      full_name,
      phone,
      email: email || null,
      service_interest,
      message: message || null,
      source,
    });
  } catch (e) {
    console.error('contact insert', e);
    return res.status(500).json({ error: 'Could not save submission' });
  }

  try {
    await sendContactNotification({
      full_name,
      phone,
      email,
      service_interest,
      message,
      source,
    });
  } catch (e) {
    console.error('contact email', e);
  }

  res.json({ ok: true });
});

app.post('/api/payments/create-order', paymentLimiter, async (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(503).json({
      error: 'Payments not configured',
      hint: 'Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env',
    });
  }

  const Razorpay = require('razorpay');
  const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });

  const body = req.body || {};
  const amountPaise = Number(body.amount_paise);
  if (!Number.isFinite(amountPaise) || amountPaise < 100 || amountPaise > 5_000_000) {
    return res.status(400).json({ error: 'amount_paise must be between 100 and 5000000 (INR paise)' });
  }

  const contact_name = sanitize(body.contact_name, 200);
  const contact_phone = sanitize(body.contact_phone, 40);
  const contact_email = sanitize(body.contact_email, 200);
  const service_note = sanitize(body.service_note, 500);

  if (!contact_name || !contact_phone) {
    return res.status(400).json({ error: 'contact_name and contact_phone are required' });
  }

  const receipt = `vega_${Date.now().toString(36)}`;

  let order;
  try {
    order = await instance.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt,
      notes: {
        contact_name,
        contact_phone,
        service: service_note || 'booking',
      },
    });
  } catch (e) {
    console.error('razorpay create order', e);
    return res.status(502).json({ error: 'Could not create payment order' });
  }

  try {
    insertPayment.run({
      razorpay_order_id: order.id,
      amount_paise: amountPaise,
      currency: order.currency || 'INR',
      status: 'created',
      contact_name,
      contact_phone,
      contact_email: contact_email || null,
      service_note: service_note || null,
    });
  } catch (e) {
    console.error('payment insert', e);
    return res.status(500).json({ error: 'Could not record order' });
  }

  res.json({
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    key_id: keyId,
  });
});

app.post('/api/payments/verify', paymentLimiter, (req, res) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return res.status(503).json({ error: 'Payments not configured' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment verification fields' });
  }

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto.createHmac('sha256', keySecret).update(payload).digest('hex');

  if (expected !== razorpay_signature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    updatePaymentVerified.run({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
    });
  } catch (e) {
    console.error('payment verify update', e);
  }

  res.json({ ok: true });
});

if (isProd) {
  const staticDir = path.join(__dirname, '..', '..', 'client', 'dist');
  app.use(express.static(staticDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(staticDir, 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Vega API listening on http://localhost:${PORT} (${isProd ? 'production' : 'development'})`);
});
