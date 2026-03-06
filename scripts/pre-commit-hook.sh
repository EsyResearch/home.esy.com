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

# ── readTime validation ──────────────────────────────────────────────
# When essay files or visualEssays.ts change, verify readTime values
# match computed values (±1 min tolerance).

ESSAY_CHANGED=false
for f in $STAGED_FILES; do
  case "$f" in
    src/app/essays/*Client.tsx|src/app/essays/*Client.jsx) ESSAY_CHANGED=true; break ;;
    src/app/essays/*/images.ts) ESSAY_CHANGED=true; break ;;
    src/app/essays/*/meta.ts) ESSAY_CHANGED=true; break ;;
    src/data/visualEssays.ts) ESSAY_CHANGED=true; break ;;
  esac
done

if [ "$ESSAY_CHANGED" = true ]; then
  echo ">>> Essay files staged — validating readTime values..."
  node scripts/compute-read-times.mjs --json 2>/dev/null | node -e "
    const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf-8'));
    const bad = data.filter(r => r.delta !== null && Math.abs(r.delta) > 1);
    if (bad.length > 0) {
      console.error('readTime drift detected (>1 min):');
      bad.forEach(r => console.error('  ' + r.href + ': ' + r.oldReadTime + ' -> ' + r.newReadTime));
      console.error('Run: node scripts/compute-read-times.mjs --update');
      process.exit(1);
    }
  "
  if [ $? -ne 0 ]; then
    echo ">>> readTime validation FAILED. Run compute-read-times.mjs --update."
    exit 1
  fi
  echo ">>> readTime values validated."
fi
