# Fix Documentation

This directory contains detailed documentation of all fixes and resolved issues for the Esy.com project.

## Purpose

- **Knowledge Retention**: Preserve the context and reasoning behind fixes
- **Team Learning**: Share solutions and prevent repeated issues
- **Onboarding**: Help new team members understand past decisions
- **Audit Trail**: Maintain a record of what was changed and why

## How to Use

### Creating a New Fix Document

1. Copy `TEMPLATE.md` to a new file with format: `YYYY-MM-DD-brief-description.md`
   ```bash
   cp TEMPLATE.md 2025-01-20-fix-navigation-scroll.md
   ```

2. Fill out all sections of the template
3. Be specific and include code examples
4. Link to relevant PRs, issues, and commits

### Best Practices

1. **File Naming**
   - Use ISO date format: YYYY-MM-DD
   - Use lowercase with hyphens
   - Be descriptive but concise
   - Examples:
     - ✅ `2025-01-20-fix-memory-leak-image-upload.md`
     - ✅ `2025-01-20-optimize-database-queries.md`
     - ❌ `fix1.md`
     - ❌ `navigation_bug_FINAL.md`

2. **Content Guidelines**
   - Write for future you (or a new team member)
   - Include actual error messages
   - Show before/after code snippets
   - Document "why" not just "what"
   - Include performance metrics if relevant

3. **Categories**
   - **Bug**: Something that was broken
   - **Performance**: Speed or efficiency improvements
   - **Security**: Vulnerability fixes
   - **Feature**: New functionality issues
   - **UI-UX**: User interface or experience problems

4. **Severity Levels**
   - **Critical**: System down, data loss, security breach
   - **High**: Major feature broken, significant user impact
   - **Medium**: Feature partially broken, workaround available
   - **Low**: Minor issue, cosmetic problems

## Quick Links

### 🔥 Common Patterns (Check These First!)

These are **recurring issues** that affect multiple pages. Check here before debugging:

| Pattern | Symptoms | Quick Fix |
|---------|----------|-----------|
| [**Global CSS Hero Conflict**](./visual-essays/PATTERN-global-css-hero-content-fix.md) | Hero invisible, two-column split on wide screens | Override `grid-template-columns: unset` |

### Recent Fixes
- [2025-01-25 Essays Header/Footer Production](./2025-01-25-essays-header-footer-production.md)
- [2025-01-20 Example Style Mismatch](./2025-01-20-example-style-mismatch.md)

### By Category
- **Bugs**: [List of bug fixes]
- **Performance**: [List of performance fixes]
- **Security**: [List of security fixes]
- **CSS Patterns**: [Global CSS Hero Conflict](./visual-essays/PATTERN-global-css-hero-content-fix.md)

### By Component
- **Navigation**: [Navigation-related fixes]
- **Authentication**: [Auth-related fixes]
- **Content**: [Content management fixes]
- **Visual Essays**: [visual-essays/](./visual-essays/) — Scrollytelling fix patterns

## Maintenance

- Review and archive old fixes annually
- Update template based on team needs
- Consider migrating to issue tracking system for large projects