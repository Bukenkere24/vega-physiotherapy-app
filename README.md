# Vega Physiotherapy — full-stack website

React (Vite) frontend and Express API with **SQLite** persistence, **Razorpay** booking flow, contact form storage, and optional **SMTP** email notifications. Built from your HTML reference and the **VEGA PHYSIOTHERAPY website.pdf** brief (pages, SEO, GA4, maps, WhatsApp/call, academy enquiry).

## Quick start (development)

1. **Client env** — copy `client/.env.example` to `client/.env.local` and set phone/WhatsApp E.164 values (digits only after country code, e.g. `9198xxxxxxx`).

2. **Server env** — copy `server/.env.example` to `server/.env`. For local dev, defaults are enough; add Razorpay keys when you go live.

3. From the repo root:

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173` (proxies `/api` → `http://localhost:3001`)
- API: `http://localhost:3001/api/health`

## Production (single server)

1. Build the client: `npm run build` (outputs `client/dist`).

2. Set environment variables on the host:

   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-domain.com` (must match the public site origin for CORS)
   - `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`
   - Optional SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`

3. Start: `npm start` (runs `node server/src/index.js`).

The API serves **static files** from `client/dist` and handles `/api/*`.

## Razorpay

- **Book & Pay** page: `/book` — creates an order, opens Razorpay Checkout, then **verifies** the signature server-side.
- Until keys are set, `POST /api/payments/create-order` returns **503** with a hint (safe for staging).

## Database

- Default: SQLite file at `server/data/vega.db` (auto-created).
- Tables: `contact_submissions`, `payments`.
- Override path with `SQLITE_PATH` in `server/.env`.

## Brand assets

Add your logo as **`client/public/logo.png`**. If the file is missing, the header falls back to the gradient “V” mark.

## Client environment (Vite)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Empty in production on same host; set full API URL if API is on another domain |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |
| `VITE_PHONE_DISPLAY` / `VITE_PHONE_E164` / `VITE_WHATSAPP_E164` | Phone and WhatsApp links |
| `VITE_BOOKING_AMOUNT_PAISE` | Default assessment amount in paise (e.g. `70000` = ₹700) |
| `VITE_PARTNER_LINE` | Optional banner (e.g. title sponsor line) |

## PDF brief coverage

- Multi-page site: Home, Services, Academy, About, Contact, Blog (starter posts), Book (payments).
- Design tokens: teal / seafoam / mint / Lexend + Manrope (per PDF).
- SEO: meta + `MedicalBusiness` JSON-LD in `index.html`; `robots.txt` + `sitemap.xml` in `public/` (update domain if not `vegaphysiotherapy.in`).
- Integrations: sticky WhatsApp + call, maps embed, GA4 hook, contact + academy forms → API + DB + optional email.

## Note on Vite version

The client pins **Vite 5** for environments where newer native bundler binaries are blocked by device policy. If your deployment machine allows it, you may upgrade Vite later after testing `npm run build`.
