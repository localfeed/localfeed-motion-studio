# macOS setup — LocalFeed Motion Studio

## 1. Tools

```bash
brew install node ffmpeg
node -v   # 20+ 
ffmpeg -version
```

## 2. Clone & install

```bash
git clone https://github.com/localfeed/localfeed-motion-studio.git
cd localfeed-motion-studio
git checkout cursor/motion-studio-foundation-771f
npm ci
```

Or: `./scripts/bootstrap.sh`

## 3. Run Studio

```bash
npm run studio
```

## 4. Codex

- Skill file: `.codex/skills/motion-director/SKILL.md`
- Catalogue: `src/catalogue/catalogue.json`
- Brand: `src/brand/tokens.ts`

## 5. Common commands

| Task | Command |
|------|---------|
| Preview | `npm run studio` |
| Typecheck | `npm run typecheck` |
| Search | `npm run catalogue:search -- --q feed` |
| Render | `npx remotion render src/index.ts LogoReveal out/logo.mp4` |
| Verify | `./scripts/verify.sh` |
