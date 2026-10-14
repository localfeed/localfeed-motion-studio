# Codex handover — LocalFeed Motion Studio (macOS)

This repository is a standalone Remotion motion studio for LocalFeed. It does **not** modify the LocalFeed application.

## What you get

- Remotion 4 project with Studio preview and MP4 rendering
- 330+ render-tested reusable animations (core LocalFeed + MIT vendor libraries) + GalleryReel + CatalogueBrowser (+ BrandKit)
- Searchable catalogue at `src/catalogue/catalogue.json`
- LocalFeed brand tokens (`#E57B3C`, `#080808`, Playfair / Inter / JetBrains Mono)
- Codex skill: `.codex/skills/motion-director/SKILL.md`

## Open on a MacBook

```bash
git clone https://github.com/localfeed/localfeed-motion-studio.git
cd localfeed-motion-studio
git checkout cursor/motion-studio-foundation-771f
chmod +x scripts/*.sh
./scripts/bootstrap.sh
npm run studio
```

Studio opens in the browser. Browse folders `01 Text` … `08 Gallery`.

### Render

```bash
npx remotion render src/index.ts GalleryReel out/gallery.mp4
npx remotion still src/index.ts LogoReveal out/logo.jpeg --frame=40
```

### Search the catalogue

```bash
npm run catalogue:search -- --q lower
npm run catalogue:search -- --category social
npm run catalogue:search -- --tag brand
```

## Use with Codex on macOS

1. Open this folder in Codex / Cursor.
2. Point Codex at `.codex/skills/motion-director/SKILL.md` (or install the skill into your Codex skills path).
3. Prompt example:

> Using the motion-director skill, assemble a 12s LocalFeed promo from LogoReveal, FeedCardStack, and FeatureShowcase. Keep brand colors. Render GalleryReel-style Series to out/promo.mp4.

4. Prefer catalogue reuse over inventing new effects.

## Prerequisites (macOS)

- Node.js 20+ (22 recommended)
- npm 10+
- ffmpeg (`brew install ffmpeg`)

## Verify

```bash
./scripts/verify.sh
```


## Expanded catalogue

Use `src/catalogue/generated/codex-index.json` and `npm run catalogue:search` so Codex selects by capability without loading hundreds of source files.
