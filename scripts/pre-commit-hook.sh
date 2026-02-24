#!/usr/bin/env bash
#
# Pre-commit hook: runs pipeline tests when orchestration/ files are staged.
# Install: npm run test:install-hook

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

ORCH_CHANGED=false
for f in $STAGED_FILES; do
  case "$f" in
    orchestration/*) ORCH_CHANGED=true; break ;;
  esac
done

if [ "$ORCH_CHANGED" = false ]; then
  exit 0
fi

echo ">>> orchestration/ files staged — running pipeline tests..."
npm test

if [ $? -ne 0 ]; then
  echo ""
  echo ">>> Pipeline tests FAILED. Commit blocked."
  echo ">>> Fix failing tests or use --no-verify to skip (not recommended)."
  exit 1
fi

echo ">>> Pipeline tests passed."
