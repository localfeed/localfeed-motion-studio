#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const core = JSON.parse(
  readFileSync(join(root, "src/catalogue/catalogue.json"), "utf8"),
);
const vendor = JSON.parse(
  readFileSync(join(root, "src/catalogue/generated/vendor-catalogue.json"), "utf8"),
);
const catalogue = { entries: [...core.entries, ...vendor.entries] };

const args = process.argv.slice(2);
const get = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};

const q = (get("--q") ?? args.find((a) => !a.startsWith("--")) ?? "")
  .trim()
  .toLowerCase();
const category = get("--category") ?? "all";
const tag = get("--tag")?.toLowerCase();
const testedOnly = args.includes("--tested");
const limit = Number(get("--limit") ?? 40);

const results = catalogue.entries.filter((entry) => {
  if (testedOnly && entry.renderTested === false) return false;
  if (category !== "all" && entry.category !== category) return false;
  if (tag && !entry.tags.map((t) => t.toLowerCase()).includes(tag)) return false;
  if (!q) return true;
  const hay = [
    entry.id,
    entry.compositionId,
    entry.title,
    entry.description,
    entry.category,
    entry.source,
    ...(entry.tags || []),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
});

console.log(
  JSON.stringify(
    {
      total: catalogue.entries.length,
      matched: results.length,
      query: { q, category, tag: tag ?? null, testedOnly },
      results: results.slice(0, limit).map((e) => ({
        id: e.id,
        compositionId: e.compositionId,
        title: e.title,
        category: e.category,
        kind: e.kind,
        tags: e.tags,
        source: e.source,
        license: e.license,
        renderTested: e.renderTested ?? null,
      })),
    },
    null,
    2,
  ),
);
