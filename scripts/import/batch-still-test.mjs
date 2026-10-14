#!/usr/bin/env node
/**
 * Render still frames for catalogue compositions in batches.
 * Usage: node scripts/import/batch-still-test.mjs [--limit N] [--offset N] [--ids a,b] [--source lifeprompt]
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "../..");
const args = process.argv.slice(2);
const get = (f) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};

const limit = Number(get("--limit") ?? 50);
const offset = Number(get("--offset") ?? 0);
const sourceFilter = get("--source");
const ids = get("--ids")?.split(",").filter(Boolean);

const core = JSON.parse(
  readFileSync(join(root, "src/catalogue/catalogue.json"), "utf8"),
).entries;
const vendor = JSON.parse(
  readFileSync(join(root, "src/catalogue/generated/vendor-catalogue.json"), "utf8"),
).entries;

let entries = [...core, ...vendor].filter((e) => e.reusable !== false);
if (ids?.length) entries = entries.filter((e) => ids.includes(e.compositionId));
if (sourceFilter)
  entries = entries.filter((e) => (e.source || "").includes(sourceFilter));
entries = entries.slice(offset, offset + limit);

const outDir = join(root, "out/frames");
mkdirSync(outDir, { recursive: true });
const resultsPath = join(root, "out/render-test-results.json");
const prev = existsSync(resultsPath)
  ? JSON.parse(readFileSync(resultsPath, "utf8"))
  : { passed: [], failed: [] };

const passed = new Set(prev.passed);
const failed = new Map(prev.failed.map((f) => [f.id, f.error]));

console.log(`Testing ${entries.length} compositions (offset=${offset} limit=${limit})`);

for (const entry of entries) {
  const id = entry.compositionId;
  const out = join(outDir, `${id}.jpeg`);
  process.stdout.write(`→ ${id} ... `);
  const frame = Math.min(30, Math.max(5, Math.floor(entry.durationInFrames / 3)));
  const res = spawnSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      id,
      out,
      `--frame=${frame}`,
      "--log=error",
    ],
    { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  );
  if (res.status === 0 && existsSync(out)) {
    console.log("OK");
    passed.add(id);
    failed.delete(id);
  } else {
    const err = (res.stderr || res.stdout || "unknown").slice(0, 500);
    console.log("FAIL");
    console.log(err.split("\n").slice(0, 4).join("\n"));
    failed.set(id, err);
    passed.delete(id);
  }
}

const payload = {
  updatedAt: new Date().toISOString(),
  passed: [...passed].sort(),
  failed: [...failed.entries()].map(([id, error]) => ({ id, error })),
  counts: { passed: passed.size, failed: failed.size },
};
writeFileSync(resultsPath, JSON.stringify(payload, null, 2) + "\n");
console.log(JSON.stringify(payload.counts));
