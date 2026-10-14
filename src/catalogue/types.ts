export type AnimationCategory =
  | "text"
  | "lower-thirds"
  | "transitions"
  | "social"
  | "product"
  | "data"
  | "backgrounds"
  | "gallery";

export type CatalogueEntry = {
  id: string;
  compositionId: string;
  title: string;
  description: string;
  category: AnimationCategory;
  tags: string[];
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  defaultProps: Record<string, unknown>;
  reusable: boolean;
  jsonControlled: boolean;
};

export type Catalogue = {
  version: string;
  brand: string;
  generatedFor: string;
  entries: CatalogueEntry[];
};
