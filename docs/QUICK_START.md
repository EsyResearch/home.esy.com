# Documentation Quick Start Guide

## Overview

This project uses a hybrid documentation approach:

1. **CHANGELOG.md** - High-level version history
2. **docs/fixes/** - Detailed fix documentation
3. **Git commits** - Atomic change tracking

## When to Document

### Use CHANGELOG.md for:
- New feature releases
- Breaking changes
- Version bumps
- Public-facing changes

### Create a fix document for:
- Complex bugs requiring investigation
- Performance optimizations
- Security vulnerabilities
- Changes affecting multiple files
- Issues likely to recur
- Anything taking >2 hours to fix

### Skip documentation for:
- Typo fixes
- Simple one-line changes
- Routine dependency updates
- Documentation updates

## Quick Commands

```bash
# Create a new fix document
cd docs/fixes
cp TEMPLATE.md $(date +%Y-%m-%d)-your-fix-description.md

# Update changelog
echo "- Fixed: Your fix description" >> ../../CHANGELOG.md

# Commit with reference
git commit -m "fix: Brief description

See docs/fixes/YYYY-MM-DD-your-fix-description.md for details"
```

## Fix Document Checklist

Before submitting a fix document, ensure you've:

- [ ] Named file with YYYY-MM-DD format
- [ ] Filled out all template sections
- [ ] Included code examples
- [ ] Listed all affected files
- [ ] Documented test results
- [ ] Added lessons learned
- [ ] Linked to PR/issue

## Tips

1. **Be Specific**: "Fixed navigation bug" ❌ vs "Fixed mobile navigation menu not closing on route change" ✅
2. **Include Context**: Why did this happen? Could it happen again?
3. **Think Future**: What would help someone fix a similar issue?
4. **Use Screenshots**: For UI issues, include before/after screenshots
5. **Measure Impact**: Include performance metrics, error rates, user reports

## Examples

See `/docs/fixes/2025-01-20-example-style-mismatch.md` for a complete example.

## Questions?

- For documentation standards: See `/docs/README.md`
- For fix template: See `/docs/fixes/TEMPLATE.md`
- For changelog format: See `CHANGELOG.md`