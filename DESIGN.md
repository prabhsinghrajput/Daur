---
name: DAUR
description: A quiet-luxury fashion atelier with two registers — cream by day, after hours by night.
colors:
  atelier-cream: "oklch(0.978 0.005 68)"
  plinth-black: "oklch(0.205 0.005 68)"
  smoked-pewter: "oklch(0.543 0.005 68)"
  atelier-chalk: "oklch(0.892 0.005 68)"
  after-hours-dark: "oklch(0.135 0.005 68)"
  brass-lamp: "oklch(0.78 0.155 68)"
typography:
  display-cream:
    fontFamily: "'Bodoni Moda', Georgia, serif"
    fontSize: "clamp(120px, 22vw, 260px)"
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: "-0.025em"
  display-dark:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Bodoni Moda', Georgia, serif"
    fontSize: "clamp(3rem, 5vw, 5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  body:
    fontFamily: "'Bodoni Moda', Georgia, serif"
    fontSize: "1.1rem"
    fontWeight: 300
    lineHeight: 1.8
    letterSpacing: "normal"
  label-cream:
    fontFamily: "'Bodoni Moda', Georgia, serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
  label-dark:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  none: "0"
  card: "16px"
spacing:
  hairline: "1px"
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "96px"
  xxl: "160px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.plinth-black}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.plinth-black}"
    textColor: "{colors.atelier-cream}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-dark-primary:
    backgroundColor: "{colors.brass-lamp}"
    textColor: "{colors.after-hours-dark}"
    rounded: "{rounded.none}"
    padding: "18px 28px"
  button-dark-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.atelier-cream}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  product-card-cream:
    backgroundColor: "{colors.atelier-cream}"
    textColor: "{colors.plinth-black}"
    rounded: "{rounded.none}"
    padding: "64px 32px"
  product-card-dark:
    backgroundColor: "{colors.after-hours-dark}"
    textColor: "{colors.atelier-cream}"
    rounded: "{rounded.card}"
    padding: "32px"
  chip-amber:
    backgroundColor: "{colors.brass-lamp}"
    textColor: "{colors.after-hours-dark}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  search-input:
    backgroundColor: "{colors.atelier-cream}"
    textColor: "{colors.plinth-black}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.plinth-black}"
    rounded: "{rounded.none}"
    padding: "0"
---

# Design System: DAUR

## 1. Overview

**Creative North Star: "The Atelier After Hours"**

A collector is alone in the atelier at 9pm. Cream walls. The amber desk lamp is on. The
windows are dark. A piece of fabric that costs more than rent is folded on a plinth. The
room is warmth held inside restraint. That single image governs the whole site.

The cream hero world is the atelier by day — full ambient light, every architectural edge
visible, type behaving like type set in stone. The after-hours dark sections that arrive
later in the scroll are the same atelier with the lights dimmed: the same values, the same
restraint, but now the brass desk lamp is the only warm thing in the room. Amber appears
only in the dark world. It is forbidden in the cream world. The two registers are one
brand — different light, never different brand.

This system explicitly rejects the commercial-glossy register of Net-a-Porter, the
template-grid sameness of generic Shopify themes (Dawn, Impulse, Sense), and the
purple-gradient / glassmorphism vocabulary of AI-startup landings. None of those
neighborhoods are ours.

**Key Characteristics:**
- Two-register system — cream atelier (day) and after-hours dark (night) — same brand
- OKLCH-tinted neutrals canonical; pure `#fff` and `#000` are never used
- Bodoni Moda 900 carries the brand wordmark; weight is the loudest design element
- Sharp `border-radius: 0` everywhere in the cream world — no rounding in the hero
- After-hours dark sections allowed `rounded-2xl` on product cards (tactile, not architectural)
- Brass Lamp amber appears only in the dark world, never in cream
- Hairlines (`1px solid {colors.atelier-chalk}`) are the only structure — no shadows in cream
- Hierarchy whispers: ≥1.25 weight contrast, body ≤75ch, white space carries equal weight to type

## 2. Colors: The Atelier After Hours Palette

A two-temperature palette tuned around a single warm hue (68° on the OKLCH wheel). All
neutrals are tinted toward that hue at chroma 0.005 — barely perceptible, but it lets the
amber accent feel related rather than imported.

### Primary
- **Atelier Cream** (`oklch(0.978 0.005 68)` / target `#f9f9f9`): the walls, the light, the
  hero world. Page background of every cream-world section. Reads as paper, not white.
- **Plinth Black** (`oklch(0.205 0.005 68)` / target `#1a1a1a`): structural, weight-bearing.
  All primary text in the cream world. The 3D extrusion under the brand wordmark.
  Never pure black. The tint is the point.

### Secondary
- **Brass Lamp** (`oklch(0.78 0.155 68)` / target `#F59E0B`): warm amber, classic brass —
  not orange, not gold. The one warm light source in the after-hours dark room.
  Dual role: state indicator (sale, new, in-stock — never color alone) AND interactive
  accent (hover states, focus rings, active underlines, sectional accent moments such as
  SVG hairlines and section headings inside dark sections).

### Tertiary
- **After Hours Dark** (`oklch(0.135 0.005 68)` / target `#0A0A0B`): the surface of every
  after-hours section. Same room, lights dimmed. Carries Brass Lamp at sectional scale
  without going neon.

### Neutral
- **Smoked Pewter** (`oklch(0.543 0.005 68)` / target `#7a7a7a`): labels, subtitles,
  captions, secondary metadata, scrollbar thumb. Never body copy.
- **Atelier Chalk** (`oklch(0.892 0.005 68)` / target `#e0e0e0`): hairlines, borders, the
  stitched grid, dividers. Barely-there structure. The architecture you don't see until
  you look for it.

### Named Rules

**The Two-Light Rule.** Brass Lamp amber lives only in the after-hours dark world. It is
forbidden in the cream world. If a cream-world surface has amber on it, the surface is
broken — not the rule.

**The No-Pure-Black Rule.** Pure `#000` and pure `#fff` are prohibited. Plinth Black,
Atelier Cream, and After Hours Dark replace them. Pure neutrals make the page read as a
template; tinted neutrals make it read as a room.

**The State-Plus-Word Rule.** Color alone never carries state. "In stock" is the chip
plus the word. "Sale" is the chip plus the price. WCAG 2.2 AA, deuteranopia, protanopia
all pass because color is never the only signal.

**Current state — to migrate.** Several files still ship hex literals: `globals.css`
holds `#f9f9f9`, `#1a1a1a`, `#7a7a7a`, `#e0e0e0`; `home.module.css` and `Navbar.tsx`
use `#fff` / `#000` / `#ccc`. Replace with the OKLCH tokens or CSS custom properties
that reference them. The OKLCH values above are canonical; the hex equivalents are
fallback only.

## 3. Typography

**Display Font (cream world):** Bodoni Moda 900 (with Georgia, serif as fallback).
**Display Font (after-hours dark):** Playfair Display 600 (with Georgia, serif as fallback).
**Body Font:** Bodoni Moda 300/400 — the same family in lower weights, doing double duty.
**Label Font (cream world):** Bodoni Moda 500.
**Label Font (after-hours dark):** DM Sans 500 (with system-ui as fallback).

**Character:** Two display serifs that share Didone DNA so the registers feel like one
brand, not two. Bodoni Moda's high contrast and brutal weight 900 carry the hero
wordmark. Playfair's slightly softer modulation works inside dark product surfaces where
the type sits closer to the eye. DM Sans is the only sans in the system — it appears only
on labels in dark sections, never in the cream world, and never as Inter (Inter is the
cliché we're avoiding).

### Hierarchy

- **Display (cream)** (Bodoni Moda 900, `clamp(120px, 22vw, 260px)`, line-height 0.85,
  tracking `-0.025em`): the brand wordmark in the hero. One per page. Architectural
  weight; carries the 3D extrusion treatment.
- **Display (after-hours dark)** (Playfair Display 600, `clamp(2.5rem, 6vw, 5rem)`,
  line-height 0.95, tracking `-0.02em`): section openers inside dark sections. Quieter
  than the hero by design — the hero earned its size; section headers do not.
- **Headline** (Bodoni Moda 400, `clamp(3rem, 5vw, 5rem)`, line-height 0.9, tracking
  `-0.04em`): editorial titles inside cream sections (`Featured Collection`, the
  Editorial spread, the About statement). Authority through letterspacing, not weight.
- **Body** (Bodoni Moda 300, `1.1rem`, line-height 1.8, tracking normal): editorial
  copy. Capped at **65–75ch**. No paragraph runs the full width.
- **Label (cream)** (Bodoni Moda 500, `0.8rem`, tracking `0.18em`, uppercase): section
  subtitles, product names in the cream grid, footer column titles, side numbers.
- **Label (after-hours dark)** (DM Sans 500, `0.75rem`, tracking `0.18em`, uppercase):
  the only place sans appears. Card eyebrows, badge text, microcopy in dark sections.

### Named Rules

**The Weight-Beats-Color Rule.** Hierarchy contrast comes from weight (900 → 400 → 300)
and from spacing, never from color. Two grays of different lightness for "primary" and
"secondary" text is the SaaS reflex; we reject it. Smoked Pewter is reserved for labels,
not for "softer body copy".

**The Inter Ban.** Inter does not appear anywhere in this system. If you need a sans in
a dark section, it is DM Sans. If you need a sans in the cream world, the answer is
"you don't — use Bodoni Moda at 500".

**Current state — to migrate.** `globals.css` imports both Inter and Bodoni Moda. The
Inter `@import` is dead weight — DM Sans should replace it once the after-hours sections
ship. `--font-sans` currently points at `'Bodoni Moda', Georgia, serif`, which is
correct for the cream world but ambiguous when components in dark sections start using
the same variable. Split to `--font-sans-cream` and `--font-sans-dark` (or scope by
section).

## 4. Elevation

DAUR is **flat, structural, and hairline-defined.** No box-shadows in cream-world
sections. Depth is conveyed by the 3D extrusion baked into the hero wordmark itself
(stacked text-shadows, not layered surfaces) and by hairline rules at `1px solid
{colors.atelier-chalk}` between every cream-world section and around every product cell.
The stitched grid is the only "elevation" the cream world acknowledges.

After-hours dark sections may use one ambient soft-glow shadow under the brass-amber
accent on focus or hover, but it is a response to state — never decorative chrome.
Drop shadows on dark surfaces are otherwise prohibited; tonal layering against
After Hours Dark does the same job better.

### Shadow Vocabulary

- **Hero extrusion** (stacked `text-shadow` ladder, twenty steps from `1px 2px 0 #161616`
  to `20px 26px 0 #070707`, plus a final ambient blur at `22px 30px 18px rgba(0,0,0,0.55)`):
  applied only to the brand wordmark. Architectural, sculptural, never reused.
- **Brass focus glow** (after-hours only) (`0 0 0 2px {colors.brass-lamp}`,
  `0 8px 32px oklch(0.78 0.155 68 / 0.25)`): focus ring inside dark sections. Soft amber
  halo. Never appears in the cream world.

### Named Rules

**The Hairline-Or-Nothing Rule.** Cream-world structure is `1px solid Atelier Chalk` or
nothing. No `2px`, no `border-left` accent stripes, no shadow. If a section needs to feel
heavier, change the spacing — not the line weight.

**The Flat Cream Rule.** Cream sections have no `box-shadow`. None. The 3D in the hero is
done in `text-shadow` on the wordmark; that is the only sculpting we allow above the
fold. Anywhere else in the cream world, `box-shadow: none`.

## 5. Components

### Buttons

- **Shape:** sharp — `border-radius: 0`. Never rounded, in either world.
- **Cream Primary:** transparent background, `1px solid Plinth Black`, Plinth Black text,
  `padding: 16px 24px`, uppercase label-cream typography, tracking `0.1em`.
- **Cream Hover:** background fills to Plinth Black, text inverts to Atelier Cream,
  transition `400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- **Dark Primary (after-hours):** Brass Lamp background, After Hours Dark text,
  `padding: 18px 28px`, label-dark typography. The only place a saturated fill sits on a
  button.
- **Dark Ghost (after-hours):** transparent background, `1px solid Atelier Chalk` at
  20% opacity, Atelier Cream text. Hover: border becomes Brass Lamp, text becomes Brass
  Lamp.
- **Focus:** cream world — `2px solid Plinth Black` outline, `2px` offset. Dark world —
  brass focus glow (see Elevation).

### Chips (after-hours only)

- **Style:** Brass Lamp background, After Hours Dark text, `border-radius: 0`, padding
  `4px 10px`, label-dark typography.
- **Use:** sale, new, in-stock indicators on dark product cards. Always paired with the
  word ("SALE", "IN STOCK") — never color alone. Cream-world equivalents are typeset
  text in Smoked Pewter, no chip.

### Cards / Product Tiles

- **Cream Product Cell** (cream world):
  - **Corner Style:** sharp (`border-radius: 0`).
  - **Background:** Atelier Cream at rest; very subtle wash of itself on hover (no shadow).
  - **Border:** participates in the stitched grid — `1px solid Atelier Chalk` on right
    and bottom only, so a 3-column grid renders as one continuous stitch.
  - **Internal Padding:** `64px 32px`. Generous; the object is the message.
  - **Image:** aspect ratio 3.5/5, `object-fit: cover`, hover scales to 1.1 over
    `1500ms cubic-bezier(0.16, 1, 0.3, 1)`.

- **Dark Product Card** (after-hours world):
  - **Corner Style:** `rounded-2xl` (`border-radius: 16px`). Tactile, not architectural —
    a different register on purpose. The cream world is sharp because it's a building;
    the dark world is rounded because it's an object you'd hold.
  - **Background:** After Hours Dark.
  - **Border:** none. Tonal layering only. A `1px solid` at 8% Atelier Cream is allowed
    if separation is needed — this is the only allowance, never decorative.
  - **Amber Accent:** Brass Lamp underline under the active product name, or Brass Lamp
    chip in the corner for state. Never on the entire card.

### Inputs / Fields

- **Search Box:** `1px solid Atelier Chalk`, Atelier Cream background, `padding: 8px 16px`,
  no radius. The search icon sits inline at left at `15px`. Input itself is borderless
  and outline-suppressed because the wrapper is the field.
- **Focus:** wrapper border becomes Plinth Black. Inside the wrapper, no glow, no halo.
  In dark sections, the wrapper border becomes Brass Lamp on focus — that is the only
  interactive amber on input.

### Navigation

- **Style:** fixed top, full-width, Atelier Cream background, hairline bottom border.
- **Type:** label-cream — Bodoni Moda 500, uppercase, tracking `0.06em`, `1.1rem`.
- **Default:** Plinth Black, no underline.
- **Hover:** a `1px` underline grows from left to full width over `300ms ease`. The
  underline is Plinth Black in the cream world; Brass Lamp in dark sections.
- **Active page:** underline persists at full width.
- **Mobile:** the left and right link clusters collapse; the centered DAUR wordmark
  remains. A bag-and-search drawer is the right pattern when it ships — never a hamburger.

### Brand Wordmark (signature)

The hero wordmark is the visual identity. Bodoni Moda 900 at `clamp(120px, 22vw, 260px)`,
`color: transparent` with a `linear-gradient(160deg, #323232 → #141414)` clipped to the
glyphs, plus a twenty-step stacked `text-shadow` ladder from `#161616` darkening to
`#070707`, finished with a `22px 30px 18px rgba(0,0,0,0.55)` ambient pool. The current
implementation in `home.module.css` ships pure-hex stops; treat the canonical version
as OKLCH-tinted Plinth Black variants (`oklch(0.205-0.05 0.005 68)`-ladder). Migrate
when the gradient is touched. The wordmark is a one-time effect — never reused on
section headers or product names.

## 6. Do's and Don'ts

### Do

- **Do** keep `border-radius: 0` on every cream-world surface — buttons, cards, search,
  navbar, footer. The hero world is sharp and architectural. There is no rounding above
  the after-hours sections.
- **Do** allow `rounded-2xl` (16px) on product cards inside after-hours dark sections.
  That is the one register-shift, and it is intentional.
- **Do** use OKLCH-tinted neutrals as canonical (`oklch(0.978 0.005 68)` etc.). Treat
  any `#fff` / `#000` literal in source as a current-state migration target.
- **Do** pair every Brass Lamp state indicator with text — "SALE", "NEW", "IN STOCK".
  Color alone never carries state.
- **Do** drive hierarchy through weight contrast (≥1.25 ratio across steps) and white
  space, not through color shifts.
- **Do** cap body copy at `65–75ch`. Editorial breathes; it does not run the full width.
- **Do** use Smoked Pewter strictly for labels, captions, and side-numbers — never for
  body text or "softer" paragraphs.
- **Do** preserve cadence in the reduced-motion experience. Slower, damped — never a
  static photo fallback. Motion is identity.

### Don't

- **Don't** use pure `#000` or `#fff` anywhere. Tinted neutrals only.
- **Don't** put Brass Lamp amber in the cream world. Not on hover, not in icons, not in
  chips. Amber is the after-hours signal.
- **Don't** add `box-shadow` to any cream-world section. The only depth in the cream
  world is the hero wordmark's `text-shadow` ladder — and that is the wordmark's alone.
- **Don't** use side-stripe `border-left` or `border-right` greater than `1px` as a
  colored accent. Hairlines or full borders or nothing. (Cross-register absolute ban.)
- **Don't** use gradient text outside the hero wordmark. The hero gradient is the only
  one that exists in this system.
- **Don't** ship Inter. The Inter `@import` in `globals.css` is current-state; it should
  be removed when the dark sections introduce DM Sans.
- **Don't** rebuild the Net-a-Porter sale-banner / urgent-CTA pattern. No countdowns,
  no "limited stock" badges, no popups. The experience sells; the CTA only confirms.
- **Don't** drift toward generic Shopify themes (Dawn, Impulse, Sense). Identical card
  grids with icon-heading-text are the disqualifying tell. Vary cell density.
- **Don't** bring AI-startup-landing vocabulary into DAUR — purple-to-pink gradients,
  glassmorphism overlays, bouncy spring transitions. They signal zero design thinking
  and break the after-hours world the moment they appear.
- **Don't** rename the registers in code. The tokens are `cream`, `dark`, `after-hours`,
  `brass-lamp`. Do not call them `light` / `dark` / `accent` — those are SaaS terms and
  they erase the metaphor.
