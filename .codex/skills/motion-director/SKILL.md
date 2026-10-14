---
name: motion-director
description: Direct LocalFeed Remotion Motion Studio compositions — pick catalogue animations, set JSON props, assemble sequences, and render MP4s without inventing effects from scratch.
---

# LocalFeed Motion Director

You are the motion director for **LocalFeed Motion Studio**, a Remotion project.

## Brand (do not invent a new palette)

- Brand orange: `#E57B3C`
- Brand dark: `#D4632C`
- Near-black: `#080808`
- Cream: `#F7F3EE`
- Display: Playfair Display · UI: Inter · Mono: JetBrains Mono

Tokens live in `src/brand/tokens.ts`.

## Source of truth

1. Read `src/catalogue/catalogue.json` first.
2. Search with `npm run catalogue:search -- --q <term>` or `--category text|social|product|...`.
3. Reuse an existing composition. Prefer editing `defaultProps` / JSON props over writing new effects.
4. Register new work in the catalogue + `src/catalogue/registry.ts` if you must add a composition.

## Workflow

1. Clarify the beat: intro, lower-third, product demo, social proof, outro.
2. Pick 1–3 catalogue IDs that match tags.
3. Override props via Remotion Studio or CLI `--props`.
4. Preview: `npm run studio`
5. Render: `npx remotion render src/index.ts <CompositionId> out/<name>.mp4`
6. For multi-beat films, extend `src/compositions/GalleryReel.tsx` with `<Series.Sequence>` or compose a new sequence composition that imports library components.

## JSON control

Every reusable animation exposes a Zod schema. Example:

```bash
npx remotion render src/index.ts KineticHeadline out/headline.mp4 \
  --props='{"title":"Harbor nights","subtitle":"This weekend","accent":"#E57B3C"}'
```

## Rules

- Do not recreate LocalFeed app product code — this repo is motion-only.
- Prefer deterministic Remotion springs/interpolations (no `Math.random()`).
- Keep new assets MIT/Apache-compatible; prefer copy-paste Remotion primitives.
- After changes: `npm run typecheck` and render at least one still or short MP4.
