import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";

export const gridPulseSchema = z.object({
  label: z.string().optional(),
});

export type GridPulseProps = z.infer<typeof gridPulseSchema>;

export const GridPulse: React.FC<GridPulseProps> = ({
  label = "Neighborhood grid",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cols = 12;
  const rows = 7;
  const cellW = width / cols;
  const cellH = height / rows;
  const pulse = (Math.sin(frame / 8) + 1) / 2;

  return (
    <AbsoluteFill style={{ background: brand.colors.dark }}>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const dist = Math.hypot(col - cols / 2, row - rows / 2);
        const glow = interpolate(dist, [0, 8], [0.55, 0.08], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: col * cellW + 8,
              top: row * cellH + 8,
              width: cellW - 16,
              height: cellH - 16,
              borderRadius: 10,
              border: `1px solid ${brand.colors.brand}${Math.round(30 + pulse * 40)
                .toString(16)
                .padStart(2, "0")}`,
              background: `${brand.colors.brand}${Math.round(glow * (40 + pulse * 50))
                .toString(16)
                .padStart(2, "0")}`,
            }}
          />
        );
      })}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 36,
            fontWeight: 600,
            color: brand.colors.white,
            background: "#080808cc",
            padding: "16px 28px",
            borderRadius: brand.radii.pill,
          }}
        >
          {label}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
