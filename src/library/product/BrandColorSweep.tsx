import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const brandColorSweepSchema = z.object({
  title: z.string(),
});

export type BrandColorSweepProps = z.infer<typeof brandColorSweepSchema>;

const swatches = [
  { name: "Brand", value: brand.colors.brand },
  { name: "Brand Dark", value: brand.colors.brandDark },
  { name: "Dark", value: brand.colors.dark },
  { name: "Cream", value: brand.colors.cream },
];

export const BrandColorSweep: React.FC<BrandColorSweepProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: brand.colors.ink,
        padding: 100,
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontFamily: fontFamily.display,
          fontSize: 56,
          color: brand.colors.white,
          marginBottom: 48,
          opacity: springProgress({ frame, fps, delay: 2 }),
        }}
      >
        {title}
      </h1>
      <div style={{ display: "flex", gap: 28 }}>
        {swatches.map((swatch, i) => {
          const p = springProgress({ frame, fps, delay: 8 + i * 5 });
          return (
            <div
              key={swatch.name}
              style={{
                flex: 1,
                opacity: p,
                transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
              }}
            >
              <div
                style={{
                  height: 220,
                  borderRadius: brand.radii.lg,
                  background: swatch.value,
                  border: "1px solid #ffffff22",
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  fontFamily: fontFamily.sans,
                  fontWeight: 600,
                  fontSize: 22,
                  color: brand.colors.white,
                }}
              >
                {swatch.name}
              </div>
              <div
                style={{
                  fontFamily: fontFamily.mono,
                  fontSize: 18,
                  color: brand.colors.muted,
                  marginTop: 4,
                }}
              >
                {swatch.value}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
