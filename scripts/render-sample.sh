#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p out/samples

COMPOSITIONS=(
  LogoReveal
  KineticHeadline
  FeedCardStack
  LowerThirdBar
  GalleryReel
  CatalogueBrowser
)

echo "==> Rendering sample compositions"
for id in "${COMPOSITIONS[@]}"; do
  echo "---- $id"
  npx remotion render src/index.ts "$id" "out/samples/${id}.mp4" \
    --log=error
done

echo "==> Samples written to out/samples/"
ls -lah out/samples/
