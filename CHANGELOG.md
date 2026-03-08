# Changelog

All notable changes to the NeighbourGood website are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.0.1] — 2026-03-08

### Added
- Upgrade guide in the Install section explaining how to run `alembic upgrade head`
  before restarting after a `git pull`. This prevents the settings page 500 error
  that occurs when new database columns (`telegram_chat_id`, `language_code`) are
  missing in existing installations upgraded from versions prior to v1.6.0.

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
