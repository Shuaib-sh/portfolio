# Apple Design System & Portfolio Translation Spec
> **Reference:** Apple Web Experience Design Analysis  
> **Target:** Shuaib B — Software Engineer | .NET Developer Portfolio

---

## 1. Visual Philosophy & Identity

Apple's web presence is a masterclass in **reverent product photography framed by near-invisible UI**. Every page is a stack of edge-to-edge product "tiles" — alternating light and dark canvases, each centered on a hero headline, a one-line tagline, two tiny blue pill CTAs, and an impossibly crisp product render. Nothing competes with the product. Typography is confident but quiet; color is either pure white, an off-white parchment, or a near-black tile; interactive elements are a single, quiet Action Blue (`#0066cc`).

- **Edge-to-Edge Product Tiles:** Alternating light (`#ffffff`, `#f5f5f7`) and dark (`#272729`, `#2a2a2c`, `#000000`) sections where the surface color change itself serves as the section divider.
- **Single Accent Color:** Action Blue (`#0066cc` / `#0071e3`, `#2997ff` on dark) carries 100% of the interactive signals. Zero secondary brand colors.
- **Pristine Elevation Philosophy:** Exactly **one** drop-shadow in the entire design system (`rgba(0, 0, 0, 0.22) 3px 5px 30px 0px`), applied strictly to product imagery resting on a surface. Zero decorative gradients on UI chrome, zero heavy box shadows on cards or buttons.
- **Apple Typography Cadence:** SF Pro Display with negative letter-spacing (`-0.28px` to `-0.374px`) for the iconic "Apple tight" display headlines. Body copy at 17px (`text-[17px]`, line-height `1.47`). The weight ladder strictly follows `300 / 400 / 600 / 700` (weight 500 is deliberately absent).
- **GSAP Animation Engine:** Cinematic entrance animations, ScrollTrigger scrub reveals, and effortless easing (`power3.out` / `expo.out`) that glide seamlessly as the user navigates through product tiles.

---

## 2. Color Tokens & CSS Variables

```css
:root {
  /* Brand & Accent */
  --color-primary: #0066cc;          /* Action Blue */
  --color-primary-focus: #0071e3;    /* Focus Blue */
  --color-primary-on-dark: #2997ff;  /* Sky Link Blue on dark surfaces */

  /* Text & Ink */
  --color-ink: #1d1d1f;              /* Main text on light surfaces */
  --color-ink-muted-80: #333333;     /* Secondary copy on light */
  --color-ink-muted-48: #7a7a7a;     /* Tertiary / fine-print text */
  --color-body-on-dark: #ffffff;     /* Main text on dark surfaces */
  --color-body-muted: #cccccc;       /* Secondary copy on dark */

  /* Canvas & Surfaces */
  --color-canvas: #ffffff;           /* Pure White canvas */
  --color-canvas-parchment: #f5f5f7; /* Apple Signature Parchment */
  --color-surface-pearl: #fafafc;    /* Pearl capsule surface */
  --color-surface-tile-1: #272729;   /* Near-black product tile 1 */
  --color-surface-tile-2: #2a2a2c;   /* Near-black product tile 2 */
  --color-surface-tile-3: #252527;   /* Near-black product tile 3 */
  --color-surface-black: #000000;    /* Pure black (Global Nav, void) */
  --color-surface-chip: rgba(210, 210, 215, 0.64);

  /* Hairlines & Dividers */
  --color-divider-soft: #f0f0f0;
  --color-hairline: #e0e0e0;
  --color-hairline-dark: rgba(255, 255, 255, 0.12);

  /* Single Signature Product Shadow */
  --shadow-product: 0 25px 50px -12px rgba(0, 0, 0, 0.22), 0 0 30px rgba(0, 0, 0, 0.15);
}
```

---

## 3. Typography & Hierarchy

| Token | Size | Weight | Line Height | Tracking | Purpose |
|---|---|---|---|---|---|
| `hero-display` | 56px - 72px | 600 | 1.07 | -0.025em (-0.28px) | Hero main headline |
| `display-lg` | 40px - 48px | 600 | 1.10 | -0.02em | Tile display titles |
| `display-md` | 34px | 600 | 1.25 | -0.015em | Section sub-heads |
| `lead` | 24px - 28px | 400 | 1.18 | 0 | Product one-liner tagline |
| `body-strong` | 17px | 600 | 1.24 | -0.015em | Bold inline emphasis |
| `body` | 17px | 400 | 1.47 | -0.015em | Default body copy |
| `dense-link` | 17px | 400 | 2.41 | 0 | Footer link columns (relaxed leading) |
| `caption` | 14px | 400 | 1.43 | -0.01em | Utility card captions |
| `nav-link` | 12px | 400 | 1.0 | -0.01em | Global nav link items |
| `fine-print` | 12px | 400 | 1.2 | 0 | Legal / copyright text |

---

## 4. Component Geometry & Shapes

### 4.1 Buttons
- **`button-primary`:** Full pill (`rounded-full`), `#0066cc` background, text white (`#ffffff`), `px-[22px] py-[11px]`, active micro-interaction `transform: scale(0.95)`.
- **`button-secondary-pill`:** Transparent background, `1px solid #0066cc` (or `#2997ff` on dark), text `#0066cc` / `#2997ff`, `px-[22px] py-[11px]`, `rounded-full`, active `scale(0.95)`.
- **`button-dark-utility`:** Background `#1d1d1f`, text `#ffffff`, `rounded-[8px]`, `px-[15px] py-[8px]`, active `scale(0.95)`.

### 4.2 Utility Cards & Chips
- **`store-utility-card`:** White `#ffffff` (or dark `#272729`), `rounded-[18px]`, border `1px solid #e0e0e0` (or `rgba(255, 255, 255, 0.1)`), padding `24px`. No shadows on card chrome.
- **`configurator-option-chip`:** Full pill (`rounded-full`), border `1px solid #e0e0e0`, padding `12px 16px`.

### 4.3 Navigation
- **`global-nav`:** Height `44px`, background `#000000`, text `#ffffff`, minimal, ultra-clean.
- **`sub-nav-frosted`:** Height `52px`, frosted glass with `backdrop-filter: blur(20px) saturate(180%)`, category title + persistent action button.

---

## 5. Tile Alternation Rhythm in Portfolio

1. **Global Nav (44px, Pure Black #000000)** + **Sub-Nav Frosted (52px)**
2. **Hero Tile (Dark Tile #000000 / #1d1d1f):** Shuaib B & .NET Core Architecture showcase, 3D rotatable avatar with signature Apple surface shadow and GSAP entrance.
3. **About Tile (Parchment #f5f5f7):** Engineering philosophy museum gallery, SF Pro display typography, clean utility cards.
4. **Career Tile (Dark Tile #272729):** Kaizenstar enterprise production, interactive module tabs.
5. **FormatX Tile (Pure White #ffffff):** Full-stack file conversion SaaS showcase with clean product framing.
6. **Engineering Lab Tile (Dark Tile #252527):** Interactive technical demonstration with clean code syntax surface.
7. **Skills Tile (Parchment #f5f5f7):** Apple Store utility card grid (`rounded-[18px]`, hairline borders).
8. **Academic Tile (Dark Tile #2a2a2c):** Education & Luminar mentorship.
9. **Contact Tile (Pure White #ffffff):** Direct messaging gateway with Action Blue primary button.
10. **Footer (Parchment #f5f5f7):** Apple-style relaxed leading (2.41) links and micro-legal fine-print.
