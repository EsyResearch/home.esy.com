# AI Assistant Style Guide

This document defines the standards and preferences for AI-assisted development on this project.

## Git Commit Messages

### Format
- Use conventional commit format: `type: description`
- Keep commits concise and descriptive
- **DO NOT** include "Co-Authored-By" or any AI attribution
- **DO NOT** mention AI assistance in commit messages

### Examples
✅ **Good:**
```
feat: Add user authentication system
fix: Resolve memory leak in data processing
docs: Update API documentation
```

❌ **Bad:**
```
feat: Add user authentication system

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Code Style

### Comments
- Only add comments when explicitly requested
- Keep comments concise and relevant
- No AI-related comments or attributions

### Documentation
- Create documentation only when requested
- Focus on technical accuracy over verbose explanations
- No mentions of AI assistance in docs

## Communication Style

### Responses
- Be concise and direct
- Minimize preamble and postamble
- Answer questions directly without unnecessary elaboration
- One-word answers when appropriate

### Tone
- Professional and helpful
- Avoid being preachy or explaining why you can't do something
- No emojis unless explicitly requested

## File Creation

### When to Create Files
- Only create files when absolutely necessary
- Always prefer editing existing files
- Never proactively create README or documentation files

### Naming Conventions
- Follow existing project patterns
- Use consistent casing (check project standards)

## Project-Specific Rules

### Footer Font Sizes
- 12px is acceptable for SEO-focused footer links
- Prioritize space efficiency over readability for footer

### SEO Considerations
- Footer is primarily for SEO, not user navigation
- OK to add many landing pages to footer
- Small font sizes (12px) are acceptable

## Required Review

**IMPORTANT:** This guide should be reviewed before starting any work on this project. All guidelines must be followed unless explicitly overridden by the user.

---

Last Updated: 2025-01-26