import type { AnimationCategory, Catalogue, CatalogueEntry } from "./types";

export type CatalogueQuery = {
  q?: string;
  category?: AnimationCategory | "all";
  tag?: string;
  reusableOnly?: boolean;
};

export function searchCatalogue(
  catalogue: Catalogue,
  query: CatalogueQuery = {},
): CatalogueEntry[] {
  const needle = (query.q ?? "").trim().toLowerCase();
  const category = query.category ?? "all";
  const tag = query.tag?.toLowerCase();

  return catalogue.entries.filter((entry) => {
    if (query.reusableOnly && !entry.reusable) return false;
    if (category !== "all" && entry.category !== category) return false;
    if (tag && !entry.tags.map((t) => t.toLowerCase()).includes(tag)) return false;
    if (!needle) return true;

    const haystack = [
      entry.id,
      entry.title,
      entry.description,
      entry.category,
      ...entry.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(needle);
  });
}

export function listCategories(catalogue: Catalogue): AnimationCategory[] {
  return [...new Set(catalogue.entries.map((e) => e.category))];
}

export function getEntry(
  catalogue: Catalogue,
  idOrCompositionId: string,
): CatalogueEntry | undefined {
  return catalogue.entries.find(
    (e) => e.id === idOrCompositionId || e.compositionId === idOrCompositionId,
  );
}
