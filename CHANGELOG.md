# Changelog

All notable changes to the NeighbourGood website are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

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
