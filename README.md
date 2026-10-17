# Factro Website

The public marketing site for **Factro** — the operating system for regulated
manufacturing. Built as a fast, animated, multi-page Next.js site that
introduces its products, workflows, and compliance posture, and
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
    (products)/        # /erp, /mes, /qms, /one
    products/          # /products
    how-it-works/      # all three pillars on one page
    industries/        # /industries and industry detail pages
    solutions/         # solution workflows and shared platform capabilities
    security-trust/    # /security-trust
    about/             # /about
    demo/              # /demo
    privacy/ terms/    # /privacy, /terms
  components/
    layout/            # navbar, mega menu, mobile nav, footer, cookie consent
    sections/          # page sections, product stories, workflows, and visuals
    ui/                # shared primitives (Button, IconTile, Reveal, ...)
    forms/             # demo request form
  data/                # typed product, pillar, industry, navigation, and legal content
  lib/                 # small shared utilities/hooks
public/
  brand/               # logo and brand assets
```

Site-wide chrome (navbar, footer, scroll progress bar, cookie consent) lives
in `src/app/layout.tsx`; each route under `src/app/` only needs to render its
own page content.

## Content

Copy and structured content (products, platform modules, the three pillars,
industries, FAQ, and legal sections) live under `src/data/` as typed arrays.
The Pillars page at `/how-it-works` uses the supplied platform design, with
native approval, ruleset, task and AI previews in `pillars-page.tsx` and
`pillar-demos.tsx`. The previous individual pillar URLs redirect to its
corresponding sections. Static legacy redirects
live in `next.config.ts`. `/modules` and `/platform` retain their query-aware
compatibility routes.

Product feature and role illustrations use compact HTML/CSS/SVG assets in
`product-mini-asset.tsx`, not screenshot crops. Product heroes have separate
warehouse, production, release and shared-record compositions in
`product-hero-scene.tsx`; `industry-hero.tsx` supplies industry-specific scenes.
These are labelled illustrative workflows, not live product data.

`PageReveals` applies the home page's fade-up timing to headings and list items
on other routes, without changing layout or scroll behaviour. It leaves the
home page and existing `Reveal` components alone. New asset cycles pause off
screen, on hover/focus, in background tabs and for reduced-motion preferences.

## Brand

Primary brand color is `#044AFE` (`--color-brand-500` in `globals.css`),
matching the blue in the Factro logo mark. Typography is Inter, loaded via
`next/font`.
