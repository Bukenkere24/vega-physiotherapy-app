# Vega Physiotherapy full-stack website

React (Vite) frontend and Express API with SQLite persistence, appointment/contact form storage, Google Maps directions, WhatsApp/call links, GA4 support, and optional SMTP email notifications.

## Quick start (development)

1. Copy `client/.env.example` to `client/.env.local` and set phone/WhatsApp E.164 values.
2. Copy `server/.env.example` to `server/.env`. For local development, the defaults are enough.
3. From the repo root:

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001/api/health`

## Production (single server)

1. Build the client: `npm run build` (outputs `client/dist`).
2. Set environment variables on the host:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-domain.com`
   - Optional SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`
3. Start: `npm start` (runs `node server/src/index.js`).

The API serves static files from `client/dist` and handles `/api/*`.

## Booking Flow

- `/book` and the contact page collect appointment requests with service, preferred date, and preferred time slot.
- Submissions are stored in SQLite and can be emailed via SMTP when configured.
- No online payment provider is required.

## Database

- Default: SQLite file at `server/data/vega.db` (auto-created).
- Main table: `contact_submissions`.
- Override path with `SQLITE_PATH` in `server/.env`.

## Brand Assets

Add your logo as `client/public/logo.png`. If the file is missing, the header falls back to the built-in "V" mark.

## Client Environment (Vite)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Empty in production on same host; set full API URL if API is on another domain |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |
| `VITE_PHONE_DISPLAY` / `VITE_PHONE_E164` / `VITE_WHATSAPP_E164` | Phone and WhatsApp links |
| `VITE_PARTNER_LINE` | Optional banner, such as a title sponsor line |

## Site Coverage

- Multi-page site: Home, Services, Academy, About, Contact, Blog, Book.
- SEO: meta tags, `MedicalBusiness` JSON-LD in `index.html`, `robots.txt`, and `sitemap.xml`.
- Integrations: sticky WhatsApp + call, Google Maps embed + directions link, GA4 hook, booking/contact forms to API + DB + optional email.

## Note on Vite Version

The client pins Vite 5 for environments where newer native bundler binaries are blocked by device policy. If your deployment machine allows it, you may upgrade Vite later after testing `npm run build`.
