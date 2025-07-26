# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Documentation system for tracking fixes and issues
- CHANGELOG.md for high-level version history
- docs/fixes/ directory for detailed fix documentation
- Fix documentation template and comprehensive guidelines
- Agentic Workflows guide page at /agentic-workflows
- Agentic Workflows link in footer navigation under Explore section

### Changed
- Updated hero title styling across all pages:
  - Line height changed from 1.1 to 1.3 for better readability
  - Letter spacing changed from -0.03em to 0.01em
  - Font weights set to 300/400 for consistency
- CTA heading font size updated from 3.5rem to 3rem on desktop
- Updated sitemap.ts to include all missing static pages (11 new routes added)

### Fixed
- Essays page missing header/footer in production due to trailing slash handling
  - Updated ConditionalNavigation and ConditionalFooter components
  - Added path normalization to handle production URL format
  - See: docs/fixes/2025-01-25-essays-header-footer-production.md

### Security
- [List any security updates here]

---

<!-- Template for new versions:
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features that were added

### Changed
- Changes in existing functionality

### Deprecated
- Features that will be removed in future versions

### Removed
- Features that were removed

### Fixed
- Any bug fixes

### Security
- Security updates or vulnerability fixes
-->