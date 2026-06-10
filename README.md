# Mystery Garden House 🌿

A bilingual (Turkish / English), mobile-first boutique guest house website with an
online (request-based) booking system and an admin dashboard.

> Mood: _“A misty lavender garden at dusk”_ — mysterious yet welcoming, earthy yet elegant.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** with a custom garden palette (`tailwind.config.ts`)
- Hand-rolled **shadcn/ui-style** components (Button, Card, Input, Select, Dialog, Tabs, Sheet, Table…)
- **JSON file storage** (`lib/db.ts` → `data/*.json`) — no database server
- **React Hook Form + Zod** validation
- Custom **i18n** via `[lang]` route segment + JSON dictionaries
- `next/image` optimisation, `next/font` (Playfair Display + Inter)

## Getting Started

```bash
npm install            # install dependencies
npm run dev            # http://localhost:3000  (redirects to /tr)
```

Bookings and contact messages are persisted to `data/bookings.json` and
`data/contacts.json`, created automatically on first write. The `data/` folder
is gitignored, so each clone / deploy starts empty.

Production:

```bash
npm run build
npm run start
```

## Environment

Copy `.env.example` → `.env`:

| Variable         | Default        | Purpose                       |
| ---------------- | -------------- | ----------------------------- |
| `ADMIN_USERNAME` | `admin`        | Admin dashboard login         |
| `ADMIN_PASSWORD` | `garden2024`   | Admin dashboard login         |

## Pages

| Route (TR / EN)                         | Description                              |
| --------------------------------------- | ---------------------------------------- |
| `/tr` · `/en`                           | Home (hero, story, rooms, amenities, testimonials, CTA) |
| `/[lang]/odalar`                        | Rooms — filterable grid + detail dialog  |
| `/[lang]/hakkimizda`                    | About — philosophy, host, gallery, map   |
| `/[lang]/galeri`                        | Gallery — masonry + category filter + lightbox |
| `/[lang]/iletisim`                      | Contact + booking forms, info, map       |
| `/[lang]/rezervasyon?ref=…`             | Booking confirmation                     |
| `/admin`                                | Admin dashboard (login required)         |

The middleware redirects locale-less paths (`/`, `/odalar`, …) to the visitor's
preferred locale, defaulting to Turkish.

## Booking flow

1. Guest submits the booking form (`/[lang]/iletisim`). Validation enforces required
   fields and `check-out > check-in`.
2. `POST /api/bookings` stores the request in `data/bookings.json` with status `pending`,
   generates a reference (e.g. `MGH-7F3K9`), and logs a notification email (stub in
   `lib/email.ts`).
3. Guest is redirected to the confirmation page with their reference.
4. Admin reviews requests at `/admin` and can **confirm / cancel / delete**.

No payment is taken — bookings are request-based. The email layer is a console-log stub
with a ready template for plugging in a real provider later.

## Admin

Open `/admin` and log in with the credentials above (`admin` / `garden2024`).
Auth is a simple httpOnly cookie session (`lib/auth.ts`) — fine for a demo, swap for a
real auth provider before production.

## Deployment (Vercel)

`vercel.json` builds with `next build`. The JSON store writes to the project's `data/`
folder, which is **read-only on serverless platforms like Vercel** (only `/tmp` is
writable) — so writes there won't persist. For production, point the store at `/tmp`
(edit `DATA_DIR` in `lib/db.ts`) for ephemeral storage, or swap in a hosted database.
