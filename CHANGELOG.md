# Changelog

All notable changes to the NeighbourGood website are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.3.3] — 2026-11-17

### Changed
- **Honest server sizing** in System requirements: a 5 € server is now
  described as plenty for a neighbourhood (and several side by side), since
  most neighbourhoods are well under 200 people. Minimum RAM raised from
  512 MB to 1 GB, with a note to add swap on 1 GB servers because the build
  during install and update needs about 1 GB on its own. The retired
  Hetzner CX11 name is dropped.

## [1.3.2] — 2026-11-17

### Changed
- **New app screenshots** in the "A look inside the app" slideshow, taken from
  NeighbourGood 2.8 with sample data: Communities (map of Berlin and your
  community card), Shared Resources (the new expandable cards, one opened) and
  Settings (Telegram, Bluetooth mesh and webhooks). They are 2× sharp
  (1760×1280, shown at 880×640).
- **Screenshots follow the site theme** — each slide has a light and a dark
  image; the dark one shows when the theme toggle (or the system setting on
  first visit) is dark.
- Bumped the stylesheet cache-busting query to `style.css?v=13`.

## [1.3.1] — 2026-11-17

### Changed
- **No amber left** — `--color-warning` is now warm brown, matching the app
  (v2.7.0): `#6b4a33` on `#f3e7da` in light mode, `#d4bc9f` on `#2e241b` in
  dark mode. The old amber values (`#d97706`, `#fbbf24`, `#451a03`) are gone
  from the stylesheet.
- Bumped the stylesheet cache-busting query to `style.css?v=12`.

## [1.3.0] — 2026-11-17

Redesign "A · Evolve": the same look, with tighter rules and no orange.

### Changed
- **New logo.** The house mark is redrawn as a violet tile with an arched door
  (instead of a dot), so it stays readable at favicon size. The violet matches
  the buttons, so brand colour and action colour now agree. `images/logo.svg`,
  `images/favicon.svg`, and the nav and footer marks are updated. "Good" in the
  wordmark is violet too.
- **No more orange.** `--color-accent` (kickers, mesh hubs, small labels) is now
  a warm brown (`#7a5c47` light, `#c9b8a6` dark) instead of terracotta.
- **Calmer type and colour.** `--color-text-subtle` now has readable contrast
  (`#8f6a52` light, `#8b93a1` dark). The hero subtitle, section intros and the
  hero install note are slightly smaller. "View on GitHub" is now a quiet
  text-style button, so the install button is the only filled action in the hero.
- **Install section.** It is now titled "Run NeighbourGood on your own server",
  starts with three quick steps (one-line installer, open the app, create your
  community) and keeps the manual Docker Compose path below them. The
  requirements note mentions running at home on an old laptop, a mini PC or a
  Raspberry Pi, and the higher needs of local AI features.
- The primary hero button now reads "Install NeighbourGood", and terminal titles
  read `neighbour@server:~`, so the site no longer suggests it is only for a
  Raspberry Pi.

### Added
- A **Blue Sky / Red Sky strip** directly under the hero, naming both modes.
- A **row of four top features** under it: lend and borrow, swap skills, meet up,
  ready for a crisis.
- Bumped the stylesheet cache-busting query to `style.css?v=11`.

## [1.2.1] — 2026-07-08

### Fixed
- **Mobile horizontal overflow in the hero** — the hero grid items lacked
  `min-width: 0`, so the terminal's unbreakable `git clone …` line set the
  single-column grid's minimum width and pushed the whole hero wider than
  the phone screen, cutting off both the subtitle text and the install
  commands. The column now shrinks to the viewport and long command lines
  scroll horizontally inside the terminal instead (copy still yields the
  full commands).
- **Cramped mobile nav** — the "Get Started" button wrapped onto two lines
  and the wordmark sat flush against the hamburger. The button no longer
  wraps and is more compact on small screens, the nav uses tighter mobile
  padding, and the hamburger moves to the far right with the brand pushed
  left (theme toggle and CTA grouped beside the hamburger).
- The 640px terminal font-size reduction now actually applies — it targeted
  `.terminal`, but the commands' size is set on `.terminal code`. Hero
  buttons also go full-width on very small screens instead of centring at
  intrinsic width.
- Bumped the stylesheet cache-busting query to `style.css?v=6`.

---

## [1.2.0] — 2026-07-08

### Added
- **Animated mesh-network hero** — a canvas of drifting nodes (with terracotta
  "hub" nodes for the neighbourhood Pi) linked by proximity lines, with glowing
  message pulses that hop node-to-node through the mesh. Theme-aware, pauses
  when off-screen or the tab is hidden, and fully disabled under
  `prefers-reduced-motion`.
- **Terminal boot-up animation** — the hero install commands reveal line by
  line with a blinking block caret, like output scrolling in. Copy-to-clipboard
  still yields the clean, complete command list.
- **3D tilt on the screenshot slideshow** — the frame subtly rotates toward the
  cursor (fine-pointer devices only, reduced-motion aware).
- Display serif **Fraunces** for headings (Georgia fallback), including the
  italic hero accent line.

### Changed
- Hero redesigned from a centered stack into an asymmetric editorial split:
  oversized three-line headline with italic accent on the left, live terminal
  and endpoint list on the right; the pill badge is now a small mono eyebrow.
- Screenshot slideshow enlarged from 460px to 880px (native screenshot width)
  and reframed: the macOS traffic-light dots are gone, replaced by a clean
  browser chrome with a padlock address pill; arrows fade in on hover.
- Terminal blocks lose their traffic-light dots too, gaining a
  `neighbour@pi:~` title bar with a hairline rule instead.
- Section headers are left-aligned with a mono, rule-prefixed kicker label in
  the terracotta accent.
- Sticky nav is now translucent with backdrop blur and gains a shadow once
  scrolled; feature/scenario cards lift slightly on hover.
- Bumped the stylesheet cache-busting query to `style.css?v=5`.

---

## [1.1.0] — 2026-06-19

### Changed
- Brand palette refreshed to match the app: **violet** is now the primary
  accent in both light (`#4f46e5`) and dark (`#818cf8`) themes, and the previous
  **terracotta** is repurposed as the secondary accent (`--color-accent`),
  replacing the underused green. The NeighbourGood logo stays terracotta in both
  themes — `.brand-icon` / `.brand-accent` now follow the secondary accent.
- Hero heading accent is now solid violet instead of a hardcoded green gradient.
- Feature and scenario tiles redesigned in a flat editorial style: removed the
  soft drop-shadows and tinted rounded-icon boxes, added serif index numbering
  (`01`–`06`) and hairline header rules, with a restrained border-colour hover.
  Feature icons become small colour-coded corner marks. The install "What you
  get" card and the hero terminal block are unchanged.
- Bumped the stylesheet cache-busting query to `style.css?v=4` so returning
  visitors receive the new styles.

---

## [1.0.0] — 2026-03-06

### Added
- CSS custom properties for terminal/code-block colour palette
  (`--color-terminal-bg`, `--color-terminal-text`, `--color-terminal-prompt`,
  `--color-terminal-comment`, `--color-terminal-btn-*`) replacing all
  hardcoded hex values in terminal, tech-strip, and copy-button styles
- `.install-note` CSS class to replace an inline `style` attribute on the
  install section paragraph

### Changed
- Consolidated shared card styles for `.feature-card`, `.scenario-card`, and
  `.endpoints-card` into grouped selectors; each card retains only its unique
  `padding` value
- Consolidated shared layout/typography for `.btn-hero` and
  `.btn-hero-secondary` into a grouped selector; each variant retains only
  its colour, border, and shadow differences
- Clipboard copy handler now includes a `.catch()` callback to gracefully
  handle cases where the Clipboard API is unavailable or permission is denied

### Fixed
- Removed duplicate `grid-template-columns: 1fr` rule for `.feature-grid`
  that was redundantly repeated in both the `768px` and `640px` media queries
