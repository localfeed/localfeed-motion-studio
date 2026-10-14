export type AnimationCategory =
  | "text"
  | "lower-thirds"
  | "transitions"
  | "social"
  | "product"
  | "data"
  | "backgrounds"
  | "gallery"
  | "editorial"
  | "branding"
  | "cinematic"
  | "shapes"
  | "effects"
  | "photography"
  | "cards"
  | "audio"
  | "camera"
  | "split"
  | "vertical";

export type AnimationKind = "effect" | "transition" | "scene" | "template" | "gallery";

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
  source?: string;
  license?: string;
  kind?: AnimationKind;
  aspectRatios?: string[];
  renderTested?: boolean;
  capabilities?: string[];
};

export type Catalogue = {
  version: string;
  brand: string;
  generatedFor: string;
  entries: CatalogueEntry[];
};
