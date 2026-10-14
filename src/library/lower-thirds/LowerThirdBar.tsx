import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const lowerThirdBarSchema = z.object({
  title: z.string(),
  location: z.string(),
  background: z.string().optional(),
});

export type LowerThirdBarProps = z.infer<typeof lowerThirdBarSchema>;

export const LowerThirdBar: React.FC<LowerThirdBarProps> = ({
  title,
  location,
  background = "#0a0a0acc",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springProgress({ frame, fps, delay: 4 });

  return (
    <AbsoluteFill style={{ background: brand.colors.dark }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 100,
          transform: `translateX(${interpolate(p, [0, 1], [-40, 0])}px)`,
          opacity: p,
          display: "flex",
          alignItems: "stretch",
          overflow: "hidden",
          borderRadius: brand.radii.md,
        }}
      >
        <div style={{ width: 10, background: brand.colors.brand }} />
        <div style={{ background, padding: "22px 34px", minWidth: 520 }}>
          <div
            style={{
              fontFamily: fontFamily.sans,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: brand.colors.brand,
              marginBottom: 6,
            }}
          >
            {location}
          </div>
          <div
            style={{
              fontFamily: fontFamily.display,
              fontSize: 40,
              fontWeight: 600,
              color: brand.colors.white,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
