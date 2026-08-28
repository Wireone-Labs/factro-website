# Factro Website

The public marketing site for **Factro** — the operating system for regulated
manufacturing. Built as a fast, animated, multi-page Next.js site that
introduces the platform, its modules, pricing, and compliance posture, and
routes visitors toward a demo.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack)
- **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** — CSS-first theme in `src/app/globals.css`
- **[Framer Motion](https://motion.dev)** — page/section reveals, the mega menu, scroll-driven rails, and the hero's typewriter effect
- **[Lucide](https://lucide.dev)** — icon set

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/                 # routes (App Router) — one folder per page
    platform/          # /platform
    pricing/           # /pricing
    compliance/        # /compliance
    about/             # /about
    book-demo/         # /book-demo
    privacy/ terms/    # /privacy, /terms
  components/
    layout/            # navbar, mega menu, mobile nav, footer, cookie consent
    sections/          # page sections (hero, workflow, modules, pricing, etc.)
    ui/                # shared primitives (Button, IconTile, Reveal, ScrollRail, ...)
    forms/             # demo request form
  data/                # typed content — nav, modules, pricing, compliance, legal copy
  lib/                 # small shared utilities/hooks
public/
  brand/               # logo and brand assets
```

Site-wide chrome (navbar, footer, scroll progress bar, cookie consent) lives
in `src/app/layout.tsx`; each route under `src/app/` only needs to render its
own page content.

## Content

Copy and structured content (modules, pricing plans, compliance pillars,
FAQ, legal sections) live under `src/data/` as typed arrays, so real content
can replace the current placeholders without touching component code.

## Brand

Primary brand color is `#044AFE` (`--color-brand-500` in `globals.css`),
matching the blue in the Factro logo mark. Typography is Inter, loaded via
`next/font`.
