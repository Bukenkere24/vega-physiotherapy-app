require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { initDb } = require('./db');
const { sendContactNotification } = require('./mail');

const PORT = Number(process.env.PORT || 3001);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const isProd = process.env.NODE_ENV === 'production';

const db = initDb();

const insertContact = db.prepare(`
  INSERT INTO contact_submissions (full_name, phone, email, service_interest, preferred_date, preferred_time, message, source)
  VALUES (@full_name, @phone, @email, @service_interest, @preferred_date, @preferred_time, @message, @source)
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
  const preferred_date = sanitize(body.preferred_date, 40);
  const preferred_time = sanitize(body.preferred_time, 40);
  const message = sanitize(body.message, 4000);
  const source = sanitize(body.source, 40) || 'contact';

  if (!full_name || !phone || !service_interest || !preferred_date || !preferred_time) {
    return res.status(400).json({
      error: 'full_name, phone, service_interest, preferred_date, and preferred_time are required',
    });
  }

  try {
    insertContact.run({
      full_name,
      phone,
      email: email || null,
      service_interest,
      preferred_date,
      preferred_time,
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
      preferred_date,
      preferred_time,
      message,
      source,
    });
  } catch (e) {
    console.error('contact email', e);
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
