const nodemailer = require('nodemailer');

function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user, pass },
  });
}

async function sendContactNotification(payload) {
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM || process.env.SMTP_USER;
  if (!to || !from) return { sent: false, reason: 'missing CONTACT_EMAIL_TO or FROM' };

  const transport = createTransport();
  if (!transport) return { sent: false, reason: 'smtp not configured' };

  const subject = `[Vega Website] ${payload.source === 'academy' ? 'Academy enquiry' : 'Contact'} — ${payload.service_interest}`;
  const text = [
    `Name: ${payload.full_name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || '—'}`,
    `Service: ${payload.service_interest}`,
    `Source: ${payload.source}`,
    '',
    payload.message || '(no message)',
  ].join('\n');

  await transport.sendMail({ from, to, subject, text });
  return { sent: true };
}

module.exports = { sendContactNotification };
