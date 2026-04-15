const nodemailer = require('nodemailer');

function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    auth: { user, pass },
  });
}

async function sendContactNotification(payload) {
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM || process.env.SMTP_USER;
  if (!to || !from) return { sent: false, reason: 'missing CONTACT_EMAIL_TO or FROM' };

  const transport = createTransport();
  if (!transport) return { sent: false, reason: 'smtp not configured' };

  const subject = `[Vega Website] ${payload.source === 'academy' ? 'Academy enquiry' : 'Appointment request'} - ${payload.service_interest}`;
  const text = [
    `Name: ${payload.full_name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || '-'}`,
    `Service: ${payload.service_interest}`,
    `Preferred date: ${payload.preferred_date || '-'}`,
    `Preferred time: ${payload.preferred_time || '-'}`,
    `Source: ${payload.source}`,
    '',
    payload.message || '(no message)',
  ].join('\n');

  await transport.sendMail({
    from,
    to,
    replyTo: payload.email || undefined,
    subject,
    text,
  });
  return { sent: true };
}

module.exports = { sendContactNotification };
