# Brandhgar Design System

## Aesthetic Direction
Bold, editorial digital agency feel. Premium but not corporate.
High-contrast. Confident. Every element earns its place.
Think: luxury meets raw energy — like a Nepali agency that plays on the global stage.

---

## Colors

| Role             | Value     | Usage                              |
|------------------|-----------|------------------------------------|
| Background       | `#0D0D0D` | Primary page background            |
| Surface          | `#1A1A1A` | Cards, sections, elevated elements |
| Primary Accent   | `#E02020` | CTAs, highlights, active states    |
| Accent Hover     | `#FF3333` | Hover state for red elements       |
| Text Primary     | `#FFFFFF` | Headings, key copy                 |
| Text Secondary   | `#A0A0A0` | Subtext, captions, metadata        |
| Border/Divider   | `#2A2A2A` | Subtle separators                  |
| Red on White     | `#CC0000` | When used on light backgrounds     |

### Color Rules
- Base is always dark (`#0D0D0D`) — never use white as page background
- Red (`#E02020`) is the ONLY accent color — do not introduce other accent colors
- White is for text and stark contrast moments only
- No gradients except: `linear-gradient(135deg, #E02020, #8B0000)` for special hero use

---

## Typography

### Font Families
- **Display / Hero Headings**: `Syne` (weight: 700, 800) — geometric, bold, distinctive
- **Section Headings**: `Syne` (weight: 600)
- **Body Copy**: `DM Sans` (weight: 400, 500) — clean, readable, modern
- **Labels / Tags / Eyebrows**: `DM Sans` (weight: 600, letter-spacing: 0.1em, uppercase)
- **Monospace / Code / Numbers**: `JetBrains Mono`

### Font Scale (rem-based)
```
Display:  6rem   / 96px  — hero headlines only
H1:       4rem   / 64px
H2:       2.5rem / 40px
H3:       1.75rem/ 28px
H4:       1.25rem/ 20px
Body LG:  1.125rem / 18px
Body:     1rem   / 16px
Small:    0.875rem / 14px
Label:    0.75rem / 12px — uppercase + tracked
```

### Typography Rules
- Headings always `#FFFFFF`, never gray
- Body text `#A0A0A0` for secondary, `#FFFFFF` for primary copy
- Line height: 1.1–1.2 for display/headings, 1.6–1.7 for body
- Never use Inter, Roboto, Arial, or system-ui
- Tight tracking on display text (`letter-spacing: -0.02em`)
- Uppercase + wide tracking only for labels/eyebrows (`letter-spacing: 0.12em`)

---

## Layout & Spacing

- **Max content width**: 1280px, centered with `px-6 md:px-12 lg:px-20`
- **Section vertical padding**: `py-24` minimum, `py-32` for hero
- **Grid**: 12-column base, break it intentionally — avoid purely symmetric layouts
- **Asymmetry is intentional**: offset headlines, bleed images, staggered cards
- Generous whitespace — content should breathe, not crowd

---

## Components & Interactions

### Buttons
```
Primary CTA:
  bg: #E02020  |  text: white  |  padding: px-8 py-4
  hover: bg #FF3333 + translateY(-2px) + box-shadow: 0 8px 24px rgba(224,32,32,0.4)
  border-radius: 0 (sharp edges — no rounded buttons)

Secondary / Ghost:
  border: 1px solid #2A2A2A  |  text: white
  hover: border-color #E02020 + text #E02020

Text Link:
  text: #E02020  |  underline on hover with 2px offset
```

### Cards
```
bg: #1A1A1A
border: 1px solid #2A2A2A
border-radius: 4px (subtle only)
hover: border-color #E02020 + translateY(-4px)
transition: all 300ms ease
```

### Navigation
```
bg: rgba(13,13,13,0.85) with backdrop-blur
border-bottom: 1px solid #2A2A2A
Active link: color #E02020
Hover link: color #FFFFFF with 200ms ease
```

---

## Animation (Framer Motion)

### Page Load — Staggered Reveal
```js
container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
item: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }
```

### Scroll Reveal (whileInView)
```js
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.7, ease: "easeOut" }}
```

### Hover Interactions
```js
whileHover={{ scale: 1.02 }}    // cards
whileHover={{ x: 6 }}           // arrow links / CTAs
whileTap={{ scale: 0.97 }}      // buttons
```

### Rules
- Use `ease: [0.25, 0.1, 0.25, 1]` (custom cubic-bezier) for premium feel
- Duration: 0.5–0.8s for reveals, 0.2–0.3s for hover states
- Never animate everything — pick 2–3 high-impact moments per section
- `once: true` on scroll animations — don't repeat on scroll back

---

## Do / Don't

| ✅ Do                                      | ❌ Don't                                  |
|-------------------------------------------|------------------------------------------|
| Sharp edges, 0–4px border radius          | Rounded pill buttons or cards            |
| Syne + DM Sans font pairing               | Inter, Roboto, Arial, system fonts       |
| Red as single accent color                | Multiple accent colors or purple         |
| Asymmetric, editorial layouts             | Perfectly centered, generic grids        |
| Subtle red glow on hover/active states    | Drop shadows on everything               |
| Dark backgrounds always                   | White page backgrounds                   |
| Micro-interactions on every interactive   | Static, lifeless UI elements             |
| Generous whitespace                       | Cramped, content-heavy sections          |
| Framer Motion for all animations          | CSS-only for complex transitions         |
| JetBrains Mono for numbers/stats          | Default monospace fonts                  |

---

## Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts — Syne, DM Sans, JetBrains Mono

---

## Brand Voice (for copy tone)
- Confident, not arrogant
- Direct, not cold
- Creative, not chaotic
- Nepali roots, global standard