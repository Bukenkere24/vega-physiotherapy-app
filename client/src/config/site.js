const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (apiBase) return `${apiBase}${p}`;
  return p;
}

export const site = {
  name: 'Vega Physiotherapy',
  tagline: 'Physiotherapy & Rehabilitation Centre',
  addressLines: [
    '345, Ground Floor, Siddeshwara Nilaya,',
    'Banashankari 5th Stage, Vaddarapalya (BDA),',
    'Opposite Bharat Petroleum Pump,',
    'Bengaluru – 560061, Karnataka',
  ],
  email: 'info@vegaphysiotherapy.in',
  instagram: 'https://instagram.com/vegaphysiotherapy',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1944.5195311316013!2d77.52747538359507!3d12.905209799763146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f26bdd9387b%3A0x348e0053d9b3577b!2sVega%20Physiotherapy%20and%20Rehabilitation%20Center!5e0!3m2!1sen!2sin!4v1776770922734!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
  mapsDirectionsUrl:
    'https://maps.app.goo.gl/59iK4hmmfQFnbB946',
  hours: [
    'Monday – Saturday: 8:00 AM – 8:00 PM',
    'Sunday: By appointment only',
  ],
  phoneDisplay: import.meta.env.VITE_PHONE_DISPLAY || '+91 XXXXX XXXXX',
  phoneE164: import.meta.env.VITE_PHONE_E164 || '91XXXXXXXXXX',
  whatsappE164: import.meta.env.VITE_WHATSAPP_E164 || import.meta.env.VITE_PHONE_E164 || '91XXXXXXXXXX',
  partnerLine: import.meta.env.VITE_PARTNER_LINE || '',
  gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
};

export function waLink() {
  return `https://wa.me/${site.whatsappE164.replace(/\D/g, '')}`;
}

export function telLink() {
  return `tel:+${site.phoneE164.replace(/\D/g, '')}`;
}
