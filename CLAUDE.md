# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm start` — serve production build

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Tailwind CSS v4** via PostCSS
- **Path alias**: `@/*` maps to project root

## Architecture

Fresh `create-next-app` scaffold using the App Router. All routes live in `app/`. Currently a single page (`app/page.tsx`) with the default layout (`app/layout.tsx`). No API routes, middleware, or additional pages yet.

## Design System (docs/design-guidelines.md)

This is a digital agency site (Brandhgar) with strict brand rules:

- **Dark theme only** — background `#0D0D0D`, surface `#1A1A1A`, never white backgrounds
- **Single accent color** — red `#E02020` (hover `#FF3333`), no other accents
- **Fonts**: Syne (headings, 700-800), DM Sans (body, 400-500), JetBrains Mono (stats/numbers). Never use Inter, Roboto, Arial, or system-ui
- **Sharp edges** — 0-4px border radius max, no pill buttons
- **Animations**: Framer Motion required for all animations, not CSS-only for complex transitions
- **Layout**: max-width 1280px, 12-column grid, asymmetric/editorial layouts preferred
- **Icons**: Lucide React

Note: The current layout.tsx still uses Geist fonts from the scaffold — these need to be replaced with the brand fonts.

## Landing Page Structure (docs/landing-page.md)

The landing page follows a fixed section order:
Nav -> Hero -> Trust Bar (marquee) -> Services -> About -> Work -> Process -> Testimonials -> CTA Banner -> Footer

Key content rules:
- Every section needs an eyebrow label (uppercase, DM Sans 600, red, letter-spacing 0.12em)
- Stats always in JetBrains Mono
- No illustrations or clipart — use real photos, mockups, or geometric abstracts
- Minimum 2 CTAs visible above the fold
