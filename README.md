# LocalFeed Motion Studio

Remotion-based motion design kit for LocalFeed — animation libraries, playable gallery, searchable catalogue, JSON-controlled compositions, and a Codex motion-director skill.

**Brand:** `#E57B3C` · `#080808` · Playfair Display / Inter / JetBrains Mono

## Quick start

```bash
npm ci
npm run studio
```

```bash
npx remotion render src/index.ts GalleryReel out/gallery.mp4
npm run catalogue:search -- --q brand
./scripts/verify.sh
```

## Layout

```
src/
  brand/           # tokens, fonts, logo
  library/         # reusable animations by category
  catalogue/       # catalogue.json, search, registry
  compositions/    # GalleryReel, CatalogueBrowser
  Root.tsx         # Remotion composition registration
.codex/skills/motion-director/   # Codex skill
docs/              # macOS + Codex handover
scripts/           # bootstrap, verify, render samples
```

## Catalogue

| Category | Examples |
|----------|----------|
| Text | KineticHeadline, TypewriterReveal, WordCascade, CounterStat |
| Lower thirds | LowerThirdBar, LowerThirdPill, BreakingNewsBanner |
| Transitions | WipeReveal, ZoomPunch, StaggerGrid |
| Social | FeedCardStack, StoryRing, NotificationPop |
| Product | LogoReveal, BrandColorSweep, FeatureShowcase, AppPhoneMock |
| Data | AnimatedBarChart, ProgressRing |
| Backgrounds | GradientMesh, GridPulse, ParticleDrift |
| Gallery | GalleryReel, CatalogueBrowser |

Props for each reusable animation are Zod-validated and editable in Remotion Studio.

## Docs

- [Codex handover (macOS)](docs/CODEX_HANDOVER.md)
- [macOS setup](docs/MACOS_SETUP.md)

## License note

Project code is private to LocalFeed. Animation techniques follow common Remotion patterns (springs / interpolate). Third-party packages retain their own licenses (MIT for Remotion ecosystem dependencies).


## Library expansion

Vendored MIT animation sources live under `vendor/` (see `vendor/ATTRIBUTION.md`).

- Search: `npm run catalogue:search -- --q kinetic`
- Codex index: `src/catalogue/generated/codex-index.json`
- Regenerate registry: `npm run catalogue:generate`
- Batch still tests: `npm run catalogue:test-stills -- --limit 50`
