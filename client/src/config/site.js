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
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.5490!3d12.9082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzI5LjUiTiA3N8KwMzInNTYuNCJF!5e0!3m2!1sen!2sin!4v1000000000000',
  hours: [
    'Monday – Saturday: 8:00 AM – 8:00 PM',
    'Sunday: By appointment only',
  ],
  phoneDisplay: import.meta.env.VITE_PHONE_DISPLAY || '+91 XXXXX XXXXX',
  phoneE164: import.meta.env.VITE_PHONE_E164 || '91XXXXXXXXXX',
  whatsappE164: import.meta.env.VITE_WHATSAPP_E164 || import.meta.env.VITE_PHONE_E164 || '91XXXXXXXXXX',
  bookingAmountPaise: Number(import.meta.env.VITE_BOOKING_AMOUNT_PAISE || 70000),
  partnerLine: import.meta.env.VITE_PARTNER_LINE || '',
  gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
};

export function waLink() {
  return `https://wa.me/${site.whatsappE164.replace(/\D/g, '')}`;
}

export function telLink() {
  return `tel:+${site.phoneE164.replace(/\D/g, '')}`;
}
