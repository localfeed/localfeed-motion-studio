import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";

export const zoomPunchSchema = z.object({
  text: z.string(),
});

export type ZoomPunchProps = z.infer<typeof zoomPunchSchema>;

export const ZoomPunch: React.FC<ZoomPunchProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 220, mass: 0.6 },
  });
  const scale = interpolate(punch, [0, 1], [2.4, 1]);
  const ring = interpolate(frame, [8, 40], [0.4, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: brand.colors.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          border: `4px solid ${brand.colors.brand}`,
          opacity: interpolate(frame, [8, 40], [0.8, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${ring})`,
        }}
      />
      <div
        style={{
          fontFamily: fontFamily.display,
          fontSize: 120,
          fontWeight: 700,
          color: brand.colors.white,
          transform: `scale(${scale})`,
          textShadow: `0 0 40px ${brand.colors.brand}88`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
