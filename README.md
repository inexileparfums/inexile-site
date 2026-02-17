# IN EXILE — In Exile Parfums

Single-page website for IN EXILE, a niche fragrance brand.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion** (entrance transitions)
- **Vanilla JS IntersectionObserver** (scroll reveals — no GSAP dependency on first load)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

Push to GitHub and connect to Vercel. Zero configuration needed.

## Logo

Replace `/public/logo.png` with your actual logo (transparent PNG recommended, ~320×80px or similar proportions).

The logo is displayed:
1. Centered full-screen on initial load
2. After ~1.5s it animates upward and becomes a small fixed mark at top-center

## Customization

- Colors: defined as CSS variables in `app/globals.css`
- Typography: IBM Plex Sans via Google Fonts
- Manifesto lines: edit the `lines` array in `components/ManifestoSection.js`
- About text: edit the `paragraphs` array in `components/AboutSection.js`

## API

The form posts to `/api/subscribe`. Currently returns `{ ok: true }`.
Wire up your email service (Mailchimp, ConvertKit, etc.) in `app/api/subscribe/route.js`.

## Notes

- Film grain is CSS-only (SVG filter + CSS animation)
- Background parallax texture is pure CSS + rAF scroll handler
- No external images, no stock photos
- Mobile-optimized with fluid typography using `clamp()`
