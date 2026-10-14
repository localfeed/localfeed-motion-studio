import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../brand/tokens";
import { fontFamily } from "../brand/fonts";
import { catalogue } from "../catalogue/registry";
import { searchCatalogue } from "../catalogue/search";
import { springProgress } from "../lib/motion";

export const catalogueBrowserSchema = z.object({
  query: z.string().default(""),
});

export type CatalogueBrowserProps = z.infer<typeof catalogueBrowserSchema>;

export const CatalogueBrowser: React.FC<CatalogueBrowserProps> = ({
  query = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const results = searchCatalogue(catalogue, { q: query }).slice(0, 8);

  return (
    <AbsoluteFill
      style={{
        background: brand.colors.dark,
        padding: 80,
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 18,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: brand.colors.brand,
          fontWeight: 700,
          opacity: springProgress({ frame, fps, delay: 2 }),
        }}
      >
        Catalogue · {catalogue.entries.length} animations
      </div>
      <h1
        style={{
          fontFamily: fontFamily.display,
          fontSize: 56,
          color: brand.colors.white,
          margin: "12px 0 28px",
        }}
      >
        Searchable motion library
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: brand.colors.surfaceElevated,
          borderRadius: brand.radii.pill,
          padding: "18px 28px",
          marginBottom: 36,
          border: `1px solid ${brand.colors.brand}44`,
          opacity: springProgress({ frame, fps, delay: 4 }),
        }}
      >
        <span style={{ color: brand.colors.muted, fontFamily: fontFamily.sans }}>
          Query
        </span>
        <span
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 24,
            color: brand.colors.cream,
          }}
        >
          {query || "(all)"}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: fontFamily.sans,
            color: brand.colors.brand,
            fontWeight: 600,
          }}
        >
          {results.length} shown
        </span>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {results.map((entry, i) => {
          const p = springProgress({ frame, fps, delay: 8 + i * 3 });
          return (
            <div
              key={entry.id}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr 160px",
                gap: 20,
                alignItems: "center",
                background: brand.colors.surface,
                borderRadius: brand.radii.md,
                padding: "16px 22px",
                opacity: p,
                transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: fontFamily.mono,
                  fontSize: 18,
                  color: brand.colors.brand,
                }}
              >
                {entry.id}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: fontFamily.sans,
                    fontWeight: 600,
                    fontSize: 22,
                    color: brand.colors.white,
                  }}
                >
                  {entry.title}
                </div>
                <div
                  style={{
                    fontFamily: fontFamily.sans,
                    fontSize: 16,
                    color: brand.colors.muted,
                    marginTop: 4,
                  }}
                >
                  {entry.description}
                </div>
              </div>
              <span
                style={{
                  justifySelf: "end",
                  fontFamily: fontFamily.sans,
                  fontSize: 16,
                  color: brand.colors.soft,
                  textTransform: "capitalize",
                }}
              >
                {entry.category}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
