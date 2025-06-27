# raw_templates

This directory contains reference-only code and UI templates for AI-assisted development.

- **Purpose:**
  - Store non-compiling, reference, or design template files for cross-referencing during development.
  - Files here are NOT meant to be imported, compiled, or executed as part of the app.
  - Used for AI/codegen or design review only.

- **How it works:**
  - Excluded from TypeScript and ESLint via `tsconfig.json` and ESLint ignore patterns.
  - Safe to keep in git for versioning and reference.
  - You may use any file extension, but `.template`, `.txt`, or `.md` are recommended for non-code files.

- **Best Practices:**
  - Never import from this directory in your app code.
  - Use for design, code, or UI reference only.
  - Add a note to any new template files explaining their purpose if not obvious.

---

*Maintained for AI/codegen and developer reference only. Not part of the production build.* 