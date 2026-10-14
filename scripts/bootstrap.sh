#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> LocalFeed Motion Studio bootstrap"
echo "==> Node $(node -v) · npm $(npm -v)"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "WARNING: ffmpeg not found. Remotion rendering requires ffmpeg."
fi

echo "==> Installing dependencies from package-lock.json"
npm ci

echo "==> Typecheck"
npm run typecheck

echo "==> Listing compositions"
npx remotion compositions src/index.ts | head -80

echo "==> Bootstrap complete. Run: npm run studio"
