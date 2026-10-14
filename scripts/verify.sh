#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Typecheck"
npm run typecheck

echo "==> Catalogue search smoke tests"
BRAND_MATCHED=$(npm run -s catalogue:search -- --q brand | node -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>{const j=JSON.parse(s); if(j.matched<1) process.exit(1); console.log(j.matched);})')
SOCIAL_MATCHED=$(npm run -s catalogue:search -- --category social | node -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>{const j=JSON.parse(s); if(j.matched<1) process.exit(1); console.log(j.matched);})')
echo "search ok brand=$BRAND_MATCHED social=$SOCIAL_MATCHED"

echo "==> Composition list"
npx remotion compositions src/index.ts

EXPECTED=$(node -e 'console.log(require("./src/catalogue/catalogue.json").entries.length + 1)')
echo "Expected compositions (catalogue + BrandKit): $EXPECTED"

echo "==> Still-frame renders (fast verify)"
mkdir -p out/frames out/samples
STILLS=(LogoReveal KineticHeadline WipeReveal ProgressRing AppPhoneMock CatalogueBrowser)
for id in "${STILLS[@]}"; do
  echo "---- still $id"
  npx remotion still src/index.ts "$id" "out/frames/${id}.jpeg" --frame=30 --log=error
  test -s "out/frames/${id}.jpeg"
done

echo "==> Short MP4 render (LogoReveal)"
npx remotion render src/index.ts LogoReveal out/samples/LogoReveal.mp4 --log=error
test -s out/samples/LogoReveal.mp4

echo "==> VERIFY OK"
ls -lah out/frames out/samples
