# Product

## Register

brand

## Users

Quiet-luxury collectors, primarily female, 28-45, primarily India-based with global taste
references. Fashion-literate. Knows The Row, Lemaire, Khaite, Phoebe Philo. Reads SSENSE
editorial and Business of Fashion. Archive-aware, season-light, restraint over logo.
Browses on desktop in the evening. High taste standards: will leave inside ten seconds if
anything reads as cheap, generic, or rushed.

The job they hire DAUR to do: confirm that they have found a label worth their attention,
then let them buy without ever feeling sold to. They arrive curious, not ready. The site's
job is to earn the click into the product, not chase it.

## Product Purpose

DAUR is a luxury fashion house operating direct-to-consumer through a single immersive
site. Pieces are ₹9,500 to ₹52,000, atelier-grade, archive-collected. Indian luxury
positioning, not European: pricing, currency, and copy align to the domestic collector
even where global references shape the aesthetic. (Note: the existing landing in
`src/app/page.tsx` ships placeholder EUR strings such as "€2,450"; treat these as legacy
fixture data and align all new commerce surfaces to INR.)

The site is both the brand expression and the commerce surface: the 3D hero and editorial
scroll establish that the brand deserves to exist at this price, then product detail, cart,
and checkout convert that established belief without breaking pacing.

Success, in priority order:
1. Brand prestige. The site must feel earned, not assembled. Stand alongside theRow.com,
   Lemaire.fr, the Phoebe Philo site, not alongside Farfetch or Net-a-Porter.
2. Direct sell-through. A visitor who reaches the product grid has already been sold on
   the brand by the experience above it. PDP and checkout must continue that register, not
   collapse into a generic Shopify flow.

The 3D immersive scroll is the sales argument. Conversion lives downstream of that
argument, never on top of it.

## Brand Personality

Three words: **Architectural. Deliberate. Hushed.**

Architectural: pieces and pages are constructed, not decorated. Hierarchy is structural,
weight-bearing, considered.

Deliberate: every transition, scroll moment, image reveal is a chosen pace. Nothing happens
because the framework defaults to it.

Hushed: the brand does not explain itself. Copy whispers. CTAs do not urge. White space
carries weight equal to type.

Voice in copy: declarative, short, lowercase-comfortable, no exclamation, no urgency, no
salesy verbs (discover, unlock, transform). When in doubt, remove the sentence.

## References

Real targets to evoke, with the specific quality to borrow:
- **theRow.com**: extreme typographic restraint, white space as a design material, product
  shown alone with no lifestyle context. The object is enough.
- **Lemaire.fr**: unhurried scroll pacing, editorial image treatment where fabric texture
  is the subject, zero conversion pressure anywhere on the page.
- **Phoebe Philo**: hierarchy that whispers, a brand that does not explain itself,
  considered negative space between every element.

## Anti-references

Things DAUR must never resemble, and the trait that disqualifies each:
- **Net-a-Porter**: commercial-glossy, sale banners, urgent CTAs. Reads as department
  store, not atelier.
- **Generic Shopify (Dawn, Impulse, Sense)**: grid sameness, Inter everywhere, purple CTA
  buttons, identical product cards. The default look of e-commerce. Disqualifying.
- **AI-startup gradient landings**: purple-to-pink hero gradients, glassmorphism cards,
  bouncy spring transitions. Signals zero design thinking.

If a design choice could land DAUR in any of these neighborhoods, rework the choice.

## Design Principles

1. **The object is enough.** Show the piece. Withhold lifestyle, models in lofts, and
   "shop the look" carousels. Borrowed from theRow.
2. **Hierarchy whispers.** Authority comes from restraint, not size. A change of weight
   beats a change of color. White space is the loudest element on the page.
3. **Unhurried pacing.** Scroll, transitions, and image reveals breathe. Nothing arrives
   instantly. Nothing trails on after attention has moved.
4. **Motion is identity, not garnish.** The 3D and scroll choreography are the brand
   signature. Even the reduced-motion experience preserves cadence in a softer form,
   never collapses to a static fallback.
5. **No conversion pressure, ever.** No countdowns, no banners, no urgency copy, no
   "limited stock" badges, no popups. The experience sells. The CTA only confirms.

## Accessibility & Inclusion

Target: **WCAG 2.2 AA.** AAA is rejected because the editorial dark palette and amber
accent cannot survive the 7:1 contrast requirement without losing the brand register.

Specific commitments:
- **Reduced motion**: `prefers-reduced-motion: reduce` triggers a slower, damped version
  of the 3D hero and scroll choreography. Never a static photograph fallback. Motion is
  brand identity; it gets gentler, not removed.
- **Screen readers**: product browsing must follow logical reading order regardless of
  visual scroll choreography. 3D canvas content has accessible text equivalents.
  Decorative 3D and GSAP elements are `aria-hidden`. Skip-to-content link from the Navbar
  to the product grid.
- **Color-blindness**: amber accent on dark background must pass deuteranopia and
  protanopia checks. Never use color alone to convey state (in stock, sale, sold out);
  always pair with text or an icon.
- **Keyboard**: full keyboard operability, including the 3D scroll narrative (arrow keys
  advance the scroll-locked sections at the same cadence as wheel input).
- **Internationalization**: not in scope for v1. English only, INR currency only.
  Architecture should not hardcode copy or currency in a way that blocks future
  localization (es, fr, it, ja).
