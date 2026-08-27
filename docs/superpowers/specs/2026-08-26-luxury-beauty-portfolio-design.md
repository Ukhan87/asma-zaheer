# Luxury beauty creator portfolio & media kit

Date: 2026-08-26

## Problem

Asma Zaheer (`@itsasmazaheer`) needs a public, mobile-first media kit that brand managers can scan in one sitting: who she is, proof of high-retention 9:16 work, audience fit, how to buy, and a way to send a brief. The existing Multi-Platform Pipeline repo is a local operator tool, not a public site.

## Goal

Ship a standalone Next.js App Router site at `/Users/ukhan/Documents/asma-zaheer` that:

- Positions Asma as a luxury beauty / skincare UGC creator (~30k community).
- Showcases 9:16 work with inline playback and category filters.
- Presents audience demographics and three collaboration packages.
- Collects inbound briefs and emails them via Resend to `asmazaheer08@gmail.com`.
- Uses placeholder media paths so real portrait, posters, videos, and PDF drop in later without code changes.

## Constraints

- Sibling project. No shared runtime with the pipeline.
- Stack: Next.js App Router, TypeScript, Tailwind CSS, Lucide, Framer Motion, `next/font/google`.
- Palette: porcelain `#FAF9F6`, cream `#F4F1EA`, onyx `#1A1A1A`, champagne `#C5A880`.
- Type: Playfair Display (display) + Inter (body/labels).
- Single page. `Book a Collaboration` scrolls to `#inquire` (no modal).
- Data in `data/portfolio.json` and `data/stats.json` only.
- Contact: Resend only. Env: `RESEND_API_KEY`, optional `RESEND_FROM`, optional `CONTACT_TO`.
- Every `<video>` uses `playsInline`, `muted`, `preload="metadata"`. Only one card may be unmuted at a time.
- Honeypot on the inquiry form. Bots that fill it get a 200 and no email.
- Placeholder files live under `public/images/`, `public/videos/`, and `public/media-kit.pdf`.
- `npx tsc --noEmit` and `npm run build` must pass.

## Trigger

A brand manager opens `/`. They scroll, filter work, and submit `#inquire`. The Route Handler `POST /api/contact` sends one HTML email.

## Architecture

```
Browser                         Next.js app                         Resend
  |                                 |                                  |
  | GET /                           |                                  |
  |<-- SSR: layout + page ----------|                                  |
  | (JSON inlined into sections)    |                                  |
  |                                 |                                  |
  | POST /api/contact  ------------>| validate + honeypot              |
  |                                 | if real ---- email HTML -------->|
  |<-- { ok: true } or error -------|                  to asmazaheer08 |
```

`app/page.tsx` is a server component that imports JSON and composes sections. Interactive islands (`Navbar`, `VideoGrid`/`VideoCard`, `InquiryForm`) are client components. `lib/video-audio.ts` is a module singleton: one active unmuted id, subscribe/notify.

## Components

| Unit | Role | Depends on |
| --- | --- | --- |
| `Navbar` | Sticky wordmark, section anchors, mobile menu, CTA to `#inquire` | none |
| `Hero` | Portrait, name, handle, tagline, stat pills, two CTAs | `stats.json` |
| `VideoGrid` | Category tabs; filters `portfolio.json` | `VideoCard` |
| `VideoCard` | 9:16 playback, hover/tap, play + mute, badges, overlay | `lib/video-audio.ts` |
| `AnalyticsSection` | Gender, age, locations, KPIs | `stats.json` |
| `PricingPackages` | Three packages + licensing note | none (static copy) |
| `InquiryForm` | Brief fields + honeypot; POST JSON | `/api/contact` |
| `Footer` | Media kit PDF, TikTok, Instagram, email | `stats.json` |
| `app/api/contact/route.ts` | Validate, drop honeypot, send HTML email | Resend |

## Data flow

- Server page reads `data/stats.json` and `data/portfolio.json` at build/request time and passes them as props.
- Video `src` / `poster` are public URLs (`/videos/...`, `/images/...`). Replacing files at those paths updates the site.
- Form state stays in the client. Submit body: `{ brandName, website, contactName, email, budget, deliverables, timeline, brief, honeypot }`.
- API never echoes the honeypot. Success and honeypot both return `{ ok: true }`. Validation failures return 400 with `{ ok: false, error }`. Missing key or Resend failure returns 500 with a generic error.

## Error handling

- Invalid JSON or missing required fields: 400, inline form error "Check the highlighted fields and try again."
- Honeypot filled: 200 `{ ok: true }`, no email, form shows the same thank-you as a real send (do not leak the trap).
- `RESEND_API_KEY` missing or provider error: 500, form shows "Could not send right now. Email asmazaheer08@gmail.com directly."
- Video file missing: native poster/empty playback; the card still renders. No thrown error.

## Testing

- `npx tsc --noEmit` — strict types, JSON imports, Route Handler, client islands.
- `npm run build` — production compile of all routes including `POST /api/contact`.
- Manual: hover play on desktop, tap play on mobile, unmute one card mutes others, honeypot does not send mail, real submit sends HTML mail when a key is present.

## Out of scope

- CMS, auth, CMS-backed rates, live social metrics, Telegram alerts, multi-page routing, real media production, PDF generation beyond a placeholder file.
