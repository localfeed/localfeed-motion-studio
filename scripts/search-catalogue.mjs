#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogue = JSON.parse(
  readFileSync(join(root, "src/catalogue/catalogue.json"), "utf8"),
);

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

const results = catalogue.entries.filter((entry) => {
  if (category !== "all" && entry.category !== category) return false;
  if (tag && !entry.tags.map((t) => t.toLowerCase()).includes(tag)) return false;
  if (!q) return true;
  const hay = [entry.id, entry.title, entry.description, entry.category, ...entry.tags]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
});

console.log(
  JSON.stringify(
    {
      total: catalogue.entries.length,
      matched: results.length,
      query: { q, category, tag: tag ?? null },
      results: results.map((e) => ({
        id: e.id,
        compositionId: e.compositionId,
        title: e.title,
        category: e.category,
        tags: e.tags,
      })),
    },
    null,
    2,
  ),
);
