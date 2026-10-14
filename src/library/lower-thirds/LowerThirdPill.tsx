import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const lowerThirdPillSchema = z.object({
  label: z.string(),
  detail: z.string(),
});

export type LowerThirdPillProps = z.infer<typeof lowerThirdPillSchema>;

export const LowerThirdPill: React.FC<LowerThirdPillProps> = ({ label, detail }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springProgress({ frame, fps, delay: 3 });

  return (
    <AbsoluteFill style={{ background: brand.colors.ink }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 120,
          transform: `translate(-50%, ${interpolate(p, [0, 1], [30, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`,
          opacity: p,
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: brand.colors.surfaceElevated,
          border: `1px solid ${brand.colors.brand}55`,
          borderRadius: brand.radii.pill,
          padding: "18px 28px",
        }}
      >
        <span
          style={{
            background: brand.colors.brand,
            color: brand.colors.dark,
            fontFamily: fontFamily.sans,
            fontWeight: 700,
            fontSize: 18,
            padding: "8px 16px",
            borderRadius: brand.radii.pill,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 24,
            color: brand.colors.white,
          }}
        >
          {detail}
        </span>
      </div>
    </AbsoluteFill>
  );
};
