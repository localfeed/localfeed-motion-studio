#!/usr/bin/env node
/**
 * Generate catalogue entries + TypeScript registry for vendored MIT animations.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, basename, relative } from "node:path";

const root = join(import.meta.dirname, "../..");
const outDir = join(root, "src/catalogue/generated");
mkdirSync(outDir, { recursive: true });

const CATEGORY_MAP = {
  TextAnimations: "text",
  LayoutAnimations: "editorial",
  ListAnimations: "editorial",
  LogoAnimations: "branding",
  BackgroundAnimations: "backgrounds",
  TransitionAnimations: "transitions",
  CinematicAnimations: "cinematic",
  ParticleAnimations: "backgrounds",
  ShapeAnimations: "shapes",
  DataAnimations: "data",
  EffectAnimations: "effects",
  LiquidAnimations: "effects",
  UIAnimations: "social",
  DemoAnimations: "product",
  RollerAnimations: "text",
  ThemeAnimations: "product",
};

const CAPABILITY_TAGS = {
  text: ["typography", "kinetic", "title", "caption"],
  editorial: ["layout", "magazine", "editorial", "grid"],
  branding: ["logo", "brand", "identity"],
  backgrounds: ["background", "atmosphere", "loop"],
  transitions: ["transition", "wipe", "cut"],
  cinematic: ["cinematic", "title-card", "trailer"],
  shapes: ["shapes", "geometric", "abstract"],
  data: ["data", "chart", "infographic", "stats"],
  effects: ["fx", "glitch", "liquid", "advanced"],
  social: ["social", "ui", "mobile", "caption"],
  product: ["product", "demo", "promo", "saas"],
  photography: ["photo", "image", "reveal", "gallery"],
  cards: ["card", "promo-card", "promo"],
  audio: ["audio", "beat", "music", "waveform"],
  camera: ["camera", "parallax", "ken-burns"],
  split: ["split-screen", "multi-panel"],
};

function kebab(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

function pascalFromKebabFile(file) {
  return basename(file, ".tsx")
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function listTsx(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => join(dir, f));
}

function walkScenes(scenesRoot) {
  const entries = [];
  for (const folder of readdirSync(scenesRoot)) {
    const full = join(scenesRoot, folder);
    try {
      if (!readdirSync(full, { withFileTypes: true }).some(() => true)) continue;
    } catch {
      continue;
    }
    const category = CATEGORY_MAP[folder] || "effects";
    for (const file of listTsx(full)) {
      const name = basename(file, ".tsx");
      if (name === "index") continue;
      const src = readFileSync(file, "utf8");
      const exportMatch = src.match(/export const (\w+)\s*=/);
      if (!exportMatch) continue;
      const exportName = exportMatch[1];
      const rel = relative(join(root, "src/catalogue/generated"), file)
        .replaceAll("\\", "/")
        .replace(/\.tsx$/, "");
      const id = `lp-${kebab(exportName)}`;
      const compositionId = `Lp${exportName}`;
      entries.push({
        id,
        compositionId,
        exportName,
        importPath: rel.startsWith(".") ? rel : `./${rel}`,
        title: exportName.replace(/([a-z])([A-Z])/g, "$1 $2"),
        description: `${folder.replace(/Animations$/, "")} scene — ${exportName} (lifeprompt remotion-scenes)`,
        category,
        tags: [
          ...new Set([
            ...(CAPABILITY_TAGS[category] || []),
            kebab(folder.replace(/Animations$/, "")),
            "vendor",
            "lifeprompt",
            "mit",
          ]),
        ],
        durationInFrames: 90,
        fps: 30,
        width: 1920,
        height: 1080,
        defaultProps: {},
        reusable: true,
        jsonControlled: true,
        source: "lifeprompt-team/remotion-scenes",
        license: "MIT",
        kind: "scene",
        aspectRatios: ["16:9"],
        renderTested: false,
      });
    }
  }
  return entries;
}

function walkRve(templatesDir) {
  const entries = [];
  for (const file of listTsx(templatesDir)) {
    const base = basename(file, ".tsx");
    const pascal = pascalFromKebabFile(base);
    const compositionId = `Rve${pascal}`;
    const id = `rve-${base}`;
    // capability tagging by filename keywords
    const tags = ["vendor", "rve", "mit"];
    let category = "effects";
    const n = base.toLowerCase();
    if (/text|title|typewriter|quote|caption|glitch-text|bounce|popping|pulsing|chapter|credits/.test(n)) {
      category = "text";
    } else if (/logo|brand/.test(n)) category = "branding";
    else if (/transition|wipe|dissolve|blinds|iris|push|morph|fade-through|pixel|whip/.test(n))
      category = "transitions";
    else if (/chart|progress|stat|counter|countdown|donut|pie|area|line|comparison/.test(n))
      category = "data";
    else if (/image|photo|gallery|masonry|polaroid|carousel|ken-burns|parallax|picture|zoom-reveal/.test(n))
      category = "photography";
    else if (/card|end-card|subscribe|notification|lower-third|animated-list/.test(n))
      category = "cards";
    else if (/split|pip|picture-in-picture/.test(n)) category = "split";
    else if (/sound|wave|audio/.test(n)) category = "audio";
    else if (/camera|film|cinematic|letterbox|vignette|noise|starfield|matrix|bokeh|geometric|gradient|liquid|grid-pulse|particle/.test(n))
      category = /cinematic|letterbox|film/.test(n) ? "cinematic" : "backgrounds";
    tags.push(...(CAPABILITY_TAGS[category] || []));
    tags.push(...base.split("-").slice(0, 3));

    const absImport = relative(join(root, "src/catalogue/generated"), file)
      .replaceAll("\\", "/")
      .replace(/\.tsx$/, "");
    entries.push({
      id,
      compositionId,
      exportName: pascal,
      importPath: absImport.startsWith(".") ? absImport : `./${absImport}`,
      defaultImport: true,
      title: pascal.replace(/([a-z])([A-Z])/g, "$1 $2"),
      description: `RVE template ${base}`,
      category,
      tags: [...new Set(tags)],
      durationInFrames: 90,
      fps: 30,
      width: 1920,
      height: 1080,
      defaultProps: {},
      reusable: true,
      jsonControlled: false,
      source: "reactvideoeditor/remotion-templates",
      license: "MIT",
      kind: "effect",
      aspectRatios: ["16:9"],
      renderTested: false,
    });
  }
  return entries;
}

function walkSwift(dir) {
  const entries = [];
  for (const file of listTsx(dir)) {
    const name = basename(file, ".tsx");
    const src = readFileSync(file, "utf8");
    const named = src.match(/export (?:const|function) (\w+)/);
    const def = /export default/.test(src);
    const exportName = named?.[1] || name;
    const compositionId = `Sc${exportName}`;
    const id = `sc-${kebab(exportName)}`;
    let category = "product";
    const n = name.toLowerCase();
    if (/quote|typewriter|title|minimal/.test(n)) category = "text";
    else if (/chart|metric|data|countdown|bar/.test(n)) category = "data";
    else if (/brand|logo/.test(n)) category = "branding";
    else if (/social|story|vertical|subscribe|news/.test(n)) category = "social";
    else if (/split/.test(n)) category = "split";
    else if (/gradient|celebration/.test(n)) category = "backgrounds";
    else if (/product|pricing|saas|web|event|launch|card|promo/.test(n)) category = "product";
    else if (/lower/.test(n)) category = "social";
    else if (/sound|audio|ai/.test(n)) category = "audio";

    const absImport = relative(join(root, "src/catalogue/generated"), file)
      .replaceAll("\\", "/")
      .replace(/\.tsx$/, "");
    entries.push({
      id,
      compositionId,
      exportName,
      importPath: absImport.startsWith(".") ? absImport : `./${absImport}`,
      defaultImport: def && !named,
      title: exportName.replace(/([a-z])([A-Z])/g, "$1 $2"),
      description: `SwiftClip template ${exportName}`,
      category,
      tags: [
        ...new Set([
          ...(CAPABILITY_TAGS[category] || []),
          "vendor",
          "swiftclip",
          "mit",
          "template",
        ]),
      ],
      durationInFrames: 120,
      fps: 30,
      width: 1920,
      height: 1080,
      defaultProps: {},
      reusable: true,
      jsonControlled: false,
      source: "vungods/SwiftClip",
      license: "MIT",
      kind: "template",
      aspectRatios: ["16:9", "9:16"],
      renderTested: false,
    });
  }
  return entries;
}

const lp = walkScenes(join(root, "vendor/lifeprompt-remotion-scenes/scenes"));
const rve = walkRve(join(root, "vendor/rve-remotion-templates/templates"));
const sc = walkSwift(join(root, "vendor/swiftclip/remotion"));

// Deduplicate composition IDs
const seen = new Set();
const all = [];
for (const e of [...lp, ...rve, ...sc]) {
  if (seen.has(e.compositionId)) {
    e.compositionId = `${e.compositionId}Alt`;
    e.id = `${e.id}-alt`;
  }
  seen.add(e.compositionId);
  all.push(e);
}

writeFileSync(
  join(outDir, "vendor-catalogue.json"),
  JSON.stringify(
    {
      version: "2.0.0",
      generatedAt: new Date().toISOString(),
      count: all.length,
      entries: all,
    },
    null,
    2,
  ) + "\n",
);

// Generate registry TS
const lines = [];
lines.push(`/* eslint-disable */`);
lines.push(`// AUTO-GENERATED by scripts/import/generate-vendor-registry.mjs — do not edit`);
lines.push(`import React from "react";`);
lines.push(`import { AbsoluteFill } from "remotion";`);
lines.push(`import type { CatalogueEntry } from "../types";`);
lines.push(`import vendorCatalogue from "./vendor-catalogue.json";`);
lines.push(``);

for (const e of all) {
  if (e.defaultImport) {
    lines.push(`import ${e.compositionId}Import from "${e.importPath}";`);
  } else {
    lines.push(`import { ${e.exportName} as ${e.compositionId}Import } from "${e.importPath}";`);
  }
}

lines.push(``);
lines.push(`function wrap(Comp: React.ComponentType<any>): React.FC {`);
lines.push(`  const Wrapped: React.FC = (props) => (`);
lines.push(`    <AbsoluteFill style={{ background: "#080808" }}>`);
lines.push(`      <Comp {...props} />`);
lines.push(`    </AbsoluteFill>`);
lines.push(`  );`);
lines.push(`  return Wrapped;`);
lines.push(`}`);
lines.push(``);
lines.push(`export const vendorComponents: Record<string, React.ComponentType<any>> = {`);
for (const e of all) {
  lines.push(`  ${e.compositionId}: wrap(${e.compositionId}Import),`);
}
lines.push(`};`);
lines.push(``);
lines.push(`export const vendorEntries = vendorCatalogue.entries as CatalogueEntry[];`);
lines.push(``);

writeFileSync(join(outDir, "vendor-registry.tsx"), lines.join("\n"));

console.log(
  JSON.stringify(
    {
      lifeprompt: lp.length,
      rve: rve.length,
      swiftclip: sc.length,
      totalVendor: all.length,
      out: relative(root, outDir),
    },
    null,
    2,
  ),
);
