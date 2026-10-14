import "./index.css";
import React from "react";
import { Composition, Folder } from "remotion";
import { getRegistry } from "./catalogue/registry";
import { brand } from "./brand/tokens";
import { BrandColorSweep } from "./library/product/BrandColorSweep";

const folders: Record<string, string> = {
  text: "01-Text",
  "lower-thirds": "02-Lower-Thirds",
  transitions: "03-Transitions",
  social: "04-Social",
  product: "05-Product",
  data: "06-Data",
  backgrounds: "07-Backgrounds",
  gallery: "08-Gallery",
  editorial: "09-Editorial",
  branding: "10-Branding",
  cinematic: "11-Cinematic",
  shapes: "12-Shapes",
  effects: "13-Effects",
  photography: "14-Photography",
  cards: "15-Cards",
  audio: "16-Audio",
  camera: "17-Camera",
  split: "18-Split",
};

export const RemotionRoot: React.FC = () => {
  const registry = getRegistry();
  const byCategory = Object.keys(folders).map((category) => ({
    category,
    label: folders[category],
    items: registry.filter((r) => r.entry.category === category),
  }));

  return (
    <>
      {byCategory.map(({ category, label, items }) =>
        items.length === 0 ? null : (
          <Folder key={category} name={label}>
            {items.map(({ entry, component, schema }) => (
              <Composition
                key={entry.compositionId}
                id={entry.compositionId}
                component={
                  component as unknown as React.ComponentType<
                    Record<string, unknown>
                  >
                }
                durationInFrames={entry.durationInFrames}
                fps={entry.fps}
                width={entry.width}
                height={entry.height}
                defaultProps={entry.defaultProps}
                schema={schema}
              />
            ))}
          </Folder>
        ),
      )}
      <Folder name="19-Brand">
        <Composition
          id="BrandKit"
          component={BrandColorSweep}
          durationInFrames={90}
          fps={brand.video.fps}
          width={brand.video.width}
          height={brand.video.height}
          defaultProps={{ title: "LocalFeed brand palette" }}
        />
      </Folder>
    </>
  );
};
