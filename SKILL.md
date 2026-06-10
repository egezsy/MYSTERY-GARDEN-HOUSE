## Project Context
Boutique guest house website with garden/mystery theme. Economical package but high quality. Multiple pages, bilingual TR/EN, mobile-first, booking system.

## Tech Stack
- Next.js 14 App Router
- Tailwind CSS
- shadcn/ui
- Prisma + SQLite
- next-intl (i18n)
- react-hook-form + zod
- next/image

## Design System

### Colors
- primary: #3D2817 (dark brown - soil, tree bark)
- primary-light: #5C3D2A
- primary-dark: #2A1B0F
- accent: #7B6B8D (lavender purple - mystery, twilight)
- accent-light: #9B8FAA
- accent-dark: #5E4F6E
- cream: #F8F6F1 (warm cream - morning mist)
- stone: #E8E4DE (soft gray - stone path)
- charcoal: #2C2C2C (text)
- white: #FFFFFF

### Typography
- Headings: Playfair Display, serif
- Body: Inter, sans-serif
- Hero mobile: text-3xl
- Hero tablet: text-5xl
- Hero desktop: text-6xl
- Body minimum: 16px
- Line height: relaxed

### Spacing
- Section padding: py-16 md:py-24
- Container max: max-w-7xl
- Card gap: gap-6 md:gap-8

## Architecture

### Pages (Bilingual TR/EN)
1. Home (/[lang]): Hero, Story, Rooms Preview, Amenities, Testimonials, CTA, Footer
2. Rooms (/[lang]/odalar): Grid, Filter, Detail modal
3. About (/[lang]/hakkimizda): Story, Gallery, Location
4. Gallery (/[lang]/galeri): Masonry, Lightbox, Categories
5. Contact (/[lang]/iletisim): Booking form, Contact form, Map, Info
6. Booking Confirmation (/[lang]/rezervasyon): Summary, Thank you
7. Admin (/admin): Login, Booking table, Contact table

### Mobile-First Rules
- Hamburger menu: Sheet component
- Touch targets: min 44px
- Text: min 16px on mobile
- Layout: flex-col mobile, flex-row desktop
- Cards: full-width mobile, grid desktop
- Galleries: swipe-friendly
- No horizontal scroll ever

### Booking System
- Simple request form (no payment initially)
- Fields: name, email, phone, check-in, check-out, room, guests, notes
- Status: pending, confirmed, cancelled
- Admin dashboard: table with confirm/cancel/delete
- iyzico integration optional later

### i18n Structure
- Translations in lib/translations/tr.json and en.json
- URL: /tr/... and /en/... 
- Default: Turkish
- Language switcher in header

## File Structure
app/
[lang]/layout.tsx
[lang]/page.tsx
[lang]/odalar/page.tsx
[lang]/hakkimizda/page.tsx
[lang]/galeri/page.tsx
[lang]/iletisim/page.tsx
[lang]/rezervasyon/page.tsx
admin/page.tsx
api/bookings/route.ts
api/contact/route.ts
components/
ui/ (shadcn)
sections/hero.tsx
sections/story.tsx
sections/rooms-preview.tsx
sections/amenities.tsx
sections/testimonials.tsx
sections/cta.tsx
layout/header.tsx
layout/footer.tsx
layout/mobile-nav.tsx
layout/language-switcher.tsx
rooms/room-card.tsx
rooms/room-filter.tsx
rooms/room-detail.tsx
booking/booking-form.tsx
contact/contact-form.tsx
gallery/gallery-grid.tsx
gallery/lightbox.tsx
admin/booking-table.tsx
admin/contact-table.tsx
admin/login-form.tsx
lib/
translations/tr.json
translations/en.json
i18n-config.ts
prisma.ts
utils.ts
prisma/
schema.prisma
public/
images/