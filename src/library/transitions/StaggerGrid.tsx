import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { springProgress } from "../../lib/motion";

export const staggerGridSchema = z.object({
  columns: z.number().default(6),
  rows: z.number().default(4),
});

export type StaggerGridProps = z.infer<typeof staggerGridSchema>;

export const StaggerGrid: React.FC<StaggerGridProps> = ({
  columns = 6,
  rows = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const cells = columns * rows;
  const cellW = width / columns;
  const cellH = height / rows;

  return (
    <AbsoluteFill style={{ background: brand.colors.dark }}>
      {Array.from({ length: cells }).map((_, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const delay = (col + row) * 2;
        const p = springProgress({ frame, fps, delay });
        const hueShift = (i / cells) * 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: col * cellW + 6,
              top: row * cellH + 6,
              width: cellW - 12,
              height: cellH - 12,
              borderRadius: 16,
              background: `linear-gradient(145deg, ${brand.colors.brandLight}, ${brand.colors.brandDark})`,
              opacity: interpolate(p, [0, 1], [0, 0.85]),
              transform: `scale(${interpolate(p, [0, 1], [0.4, 1])}) rotate(${hueShift - 10}deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
