import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";

export const wipeRevealSchema = z.object({
  label: z.string(),
  color: z.string().optional(),
});

export type WipeRevealProps = z.infer<typeof wipeRevealSchema>;

export const WipeReveal: React.FC<WipeRevealProps> = ({
  label,
  color = brand.colors.brand,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const wipe = interpolate(frame, [0, 25], [0, 100], {
    extrapolateRight: "clamp",
  });
  const textIn = interpolate(frame, [18, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: brand.colors.dark, opacity: out }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          clipPath: `inset(0 ${100 - wipe}% 0 0)`,
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fontFamily.display,
            fontSize: 88,
            fontWeight: 700,
            color: brand.colors.dark,
            opacity: textIn,
            transform: `scale(${interpolate(textIn, [0, 1], [0.9, 1])})`,
          }}
        >
          {label}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
