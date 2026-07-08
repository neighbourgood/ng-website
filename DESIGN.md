# NeighbourGood Design System

Reference for the design language introduced in the website overhaul (v1.2.0,
PR #15). Written so the app (or any other NeighbourGood surface) can adopt the
same rules. The website itself is the living implementation: `css/style.css`
holds every token, `js/main.js` every animation.

---

## 1. Design Principles

The overhaul was guided by one goal: **look designed, not generated**. The
concrete rules that fall out of that:

1. **Editorial, not centered.** Avoid the default "centered stack" landing-page
   look. Headlines, section headers, and body copy are left-aligned; layouts
   are asymmetric (e.g. the hero is a 1.05fr / 1fr split of copy vs. terminal).
   Center only things that are genuinely symmetric (the slideshow, the footer).

2. **No borrowed chrome.** No macOS traffic-light dots — ever. Terminal blocks
   get a real title (`neighbour@pi:~`) with a hairline rule; app/browser frames
   get a minimal address bar with a padlock pill. Decoration should say
   something true about the product, not cosplay another OS.

3. **Type carries the personality.** A characterful display serif for
   headlines, a neutral sans for UI/body, a mono for anything technical or
   labelling. Italic serif is the accent voice — used sparingly, for the one
   emotional phrase (e.g. *Help each other.*).

4. **Mono kickers instead of pill badges.** Small uppercase mono labels with a
   short rule prefix (`—— FEATURES`) replace rounded badge pills. Terracotta,
   letterspaced, quiet.

5. **Motion must mean something.** Every animation maps to a product truth:
   the mesh canvas *is* the BLE relay, the terminal boot-up *is* the install,
   the tilt invites you to inspect the screenshot. No motion for motion's sake.

6. **Restraint in surfaces.** Cards are flat: 1px border, radius, no default
   shadow. Hover states are small and physical (2–3px lift, border tint,
   modest shadow). Serif index numbers (`01`–`06`) and hairline rules give
   structure instead of drop shadows and icon tiles.

7. **Accessibility is non-negotiable.** Every animation has a
   `prefers-reduced-motion` path (see §6.5). Interactive elements have
   `aria-label`s; decorative elements have `aria-hidden="true"`; a skip link
   precedes the nav.

---

## 2. Typography

| Role     | Stack                                                                 | Usage |
|----------|-----------------------------------------------------------------------|-------|
| Headings | `"Fraunces", Georgia, "Times New Roman", serif` (`--font-heading`)   | h1–h3, serif index numbers |
| Body/UI  | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` (`--font-body`) | Everything else, incl. card h3s (`font-family: var(--font-body); font-weight: 600`) |
| Mono     | `"JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace` (`--font-mono`) | Terminals, kicker labels, endpoints, URLs, eyebrows |

- **Fraunces** is loaded from Google Fonts with optical sizing and italics:
  `Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500`.
  Weight 400 is the default for headings (`h1, h2, h3 { font-weight: 400 }`) —
  the serif does the work, not the weight. Georgia is a safe metric-ish
  fallback if the webfont fails (verified: the page holds up on it).
- **Scale:** hero h1 `clamp(2.4rem, 5vw, 3.9rem)`, line-height 1.06,
  letter-spacing −0.02em. Section h2 `clamp(1.8rem, 3.4vw, 2.5rem)`,
  letter-spacing −0.015em, max-width 22ch (forces the editorial two-line wrap).
- **Accent voice:** italic Fraunces in `--color-primary`
  (`.hero-accent { font-style: italic }`). One phrase per page, max.
- **Kicker/label style:** mono, 0.7–0.72rem, uppercase, letter-spacing
  0.12–0.14em, `--color-accent` (terracotta). Kickers get a `::before` rule:
  2rem wide, 1px tall, same color.

---

## 3. Color

Two themes, switched by `data-theme` on `<html>` (persisted as `ng-theme` in
localStorage, defaulting to `prefers-color-scheme`). All colors are CSS custom
properties — never hardcode a hex in a component.

### Light (default)

| Token | Value | Notes |
|---|---|---|
| `--color-bg` | `#fdf8f3` | warm cream, not white |
| `--color-surface` | `#ffffff` | cards, nav |
| `--color-surface-raised` | `#fef9f5` | alternating sections |
| `--color-text` | `#2d1b0e` | warm near-black |
| `--color-text-muted` | `#7a5c47` | body copy |
| `--color-text-subtle` | `#b89078` | labels, footer |
| `--color-primary` | `#4f46e5` | violet — links, buttons, Blue Sky |
| `--color-primary-hover` | `#4338ca` | |
| `--color-primary-light` | `#eef2ff` | tint backgrounds |
| `--color-accent` | `#c95d1b` | terracotta — brand, kickers, hubs |
| `--color-accent-light` | `#fef0e4` | |
| `--color-border` | `#e8d5c2` | warm hairlines |
| `--color-error` | `#dc2626` | Red Sky / crisis |
| `--color-surface-translucent` | `rgba(255,255,255,0.82)` | blurred nav |

### Dark

| Token | Value |
|---|---|
| `--color-bg` | `#0f0f1a` |
| `--color-surface` | `#1a1a2e` |
| `--color-surface-raised` | `#22223b` |
| `--color-text` | `#e8e8ed` |
| `--color-text-muted` | `#9ca3af` |
| `--color-primary` | `#818cf8` (lightened for contrast) |
| `--color-accent` | `#e07b33` |
| `--color-border` | `#2d2d44` |
| `--color-error` | `#f87171` |
| `--color-surface-translucent` | `rgba(26,26,46,0.82)` |

### Terminal palette (same in both themes)

Catppuccin-ish, intentionally theme-invariant so terminals read as "a real
dark terminal" even in light mode: bg `#1e1e2e`, text `#cdd6f4`, prompt
`#a6e3a1` (green `$`), comment `#6c7086`.

**Semantic pairing:** violet = everyday / "Blue Sky" mode; red = crisis /
"Red Sky" mode; terracotta = the brand itself (logo, kickers, mesh hubs).
Keep this mapping when porting to the app.

---

## 4. Layout & Surface Tokens

- **Radii:** `--radius-sm: 0.5rem`, `--radius: 0.75rem`, `--radius-lg: 1rem`,
  `--radius-xl: 1.5rem`. Cards use `--radius`, big frames `--radius-lg`,
  pills `999px`.
- **Shadows:** four steps (`--shadow-sm` → `--shadow-lg`), all low-alpha and
  cool. Cards have **no** shadow at rest. The slideshow frame is the one
  allowed "hero shadow": a deep drop plus a faint violet glow
  (`0 24px 48px -16px rgba(30,27,75,.35), 0 8px 20px -8px rgba(79,70,229,.18)`).
- **Transitions:** `--transition-fast: 0.15s`, `--transition: 0.2s`,
  `--transition-slow: 0.3s`, all `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Widths:** page content max 1000–1100px; hero split at ≤960px collapses to
  one column; body copy measures ~460–550px.
- **Sticky nav:** `background: var(--color-surface-translucent)` +
  `backdrop-filter: blur(14px)`, 1px bottom hairline; gains `--shadow-md` via
  a `.scrolled` class once `window.scrollY > 10`.

### Component recipes

- **Terminal block:** `--color-terminal-bg`, 1px `rgba(255,255,255,0.07)`
  border, header row = mono title left + copy button right, separated by a
  `rgba(255,255,255,0.07)` hairline. Code at 0.82rem mono, line-height 1.8,
  `white-space: pre`, green `$` prompts.
- **Browser frame (screenshots):** same dark bg, radius-lg, overflow hidden;
  top bar = centered address pill (`rgba(0,0,0,0.35)` bg, mono URL, green
  padlock icon). Nav arrows: 38px circles, `rgba(10,10,20,0.55)` +
  `backdrop-filter: blur(6px)`, at 0.65 opacity until frame hover / focus.
- **Cards:** surface bg, 1px border, radius; hover = border tints primary,
  `translateY(-3px)`, `--shadow-md`. Feature cards carry a serif
  `counter(feature, decimal-leading-zero)` index and a small color-coded
  corner icon (violet = everyday, red = crisis, terracotta = brand/infra).

---

## 5. Iconography & Imagery

- Inline SVGs only, `stroke="currentColor"`, stroke-width 2, 16–24px. No icon
  fonts, no emoji as UI (scenario flags are the deliberate exception).
- Screenshots are shown at **native resolution** (880px wide) — never scale a
  screenshot down to thumbnail size; if it can't be read, it shouldn't be
  there.

---

## 6. Motion System

Global rules first, then the three signature animations.

### 6.1 Scroll reveal

Elements with `.reveal` start `opacity: 0; translateY(20px)` and transition
0.6s ease-out to visible when an `IntersectionObserver`
(`threshold: 0.1, rootMargin: '0px 0px -40px 0px'`) sees them; each element is
un-observed after revealing (fires once).

### 6.2 Mesh-network hero (the "wow")

A `<canvas class="mesh-canvas">` absolutely fills the hero behind the content
(`pointer-events: none`, `aria-hidden`). It depicts the product: neighbours as
nodes, proximity links, and messages relaying hop-by-hop through the mesh.

**Setup**
- DPR-aware: canvas backing store scaled by `min(devicePixelRatio, 2)`.
- Node count is density-based: `clamp(16, W·H / 26000, 40)`.
- Every **9th node is a "hub"** — slightly larger, drawn in terracotta
  (`--color-accent`) at 0.75 alpha. Hubs represent the neighbourhood
  Raspberry Pi. Regular nodes: radius 1.6–3px, primary color, 0.4 alpha.
- Colors are **read from the CSS custom properties** at init and re-read via a
  `MutationObserver` on `data-theme`, so the canvas repaints correctly on
  theme toggle.

**Per frame** (time-delta based, `dt` capped at 50ms so tab-switches don't jump)
1. Nodes drift at `(random − 0.5) × 0.22` px/ms-ish velocities and wrap around
   the edges (±20px margin).
2. Links: every pair closer than **150px** (`LINK_DIST`) gets a 1px line in
   primary color, alpha `0.13 × (1 − d/150)` — closer is brighter.
3. **Pulses** ("messages"): every 1600ms, if fewer than 4 are alive, spawn one
   at a random node and greedily build a path of up to **4 hops**, each hop a
   random neighbour within link distance not yet visited. The pulse lerps
   along each segment in **700ms**; while travelling it (a) redraws the current
   segment brighter (alpha 0.35, width 1.4) and (b) draws a glowing dot —
   9px radial-gradient halo at 0.5 alpha plus a solid 2.2px core at 0.95.

**Discipline**
- Pauses (stops the rAF loop) when the hero scrolls out of view
  (IntersectionObserver) or the tab is hidden (`visibilitychange`).
- Resize re-inits, but height changes < 80px at the same width are ignored so
  mobile URL-bar show/hide doesn't reshuffle the field.
- Entirely skipped under `prefers-reduced-motion` — the hero keeps only its
  static radial gradient.

### 6.3 Terminal boot-up

The hero install block (`<code data-typewriter>`) reveals line by line, like
output scrolling in:

- JS splits the code's innerHTML on `\n` and wraps each line in
  `<span class="code-line" style="--l:i">`, **keeping the `\n` text nodes
  between spans** — this is what keeps `textContent` (and therefore the copy
  button's output) byte-identical to the un-animated version.
- CSS: each line animates opacity 0→1 over 0.3s at
  `delay = i × 0.45s + 0.5s`; a `::after` block caret (`▋`, prompt green)
  blinks forever at 1.1s steps — it reads as an idle prompt after boot.
- The wrapping is only applied when `prefers-reduced-motion` is off, so
  reduced-motion users get the full static text instantly.

### 6.4 Slideshow 3D tilt

The screenshot frame sits in a `perspective: 1400px` stage and rotates toward
the cursor: `rotateX` up to ±2.5° (inverted so the frame "faces" the pointer),
`rotateY` up to ±3.5°, eased by a 0.3s transform transition; resets on
`mouseleave`. Gated behind `(hover: hover) and (pointer: fine)` **and**
reduced-motion — touch devices never see it.

### 6.5 Reduced-motion policy

A global override kills all animation/transition durations and smooth scroll:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```

On top of that, the three JS animations (mesh, boot-up, tilt) each check the
media query and **don't initialise at all** — CSS-only kill switches are not
enough when JS sets inline styles or animation delays.

### 6.6 Micro-interactions

- Buttons: `translateY(-1px..-2px)` + shadow step-up on hover; theme toggle
  `scale(0.92)` on press.
- Cards: lift + border tint (§4).
- Copy button: swaps label to "Copied!" and tints green
  (`--color-terminal-btn-copied`) for 2s.

---

## 7. Porting Notes for the App

- The app already shares the color tokens (the website's palette was lifted
  from it in v1.1.0) — adopting §2 typography and §6 motion is the main work.
- Load Fraunces only for headings; keep app UI in Inter. In an SPA, gate the
  mesh canvas to marketing/empty-state surfaces — it's a hero ornament, not
  app chrome, and it costs a rAF loop.
- The mesh module is dependency-free canvas code (~150 lines in
  `js/main.js`) and can be extracted as-is; it only needs an absolutely
  positioned canvas over a container and the two CSS custom properties.
- Keep the semantic color mapping (violet = Blue Sky, red = Red Sky,
  terracotta = brand) consistent with the app's existing modes.
- Respect the copy-integrity trick (§6.3) anywhere animated code blocks have a
  copy button.
