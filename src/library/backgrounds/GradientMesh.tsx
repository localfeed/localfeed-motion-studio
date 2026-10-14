import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";

export const gradientMeshSchema = z.object({
  caption: z.string().optional(),
});

export type GradientMeshProps = z.infer<typeof gradientMeshSchema>;

export const GradientMesh: React.FC<GradientMeshProps> = ({
  caption = "LocalFeed Motion",
}) => {
  const frame = useCurrentFrame();
  const x1 = interpolate(frame, [0, 90], [10, 70]);
  const y1 = interpolate(frame, [0, 90], [20, 55]);
  const x2 = interpolate(frame, [0, 90], [80, 30]);
  const y2 = interpolate(frame, [0, 90], [70, 25]);

  return (
    <AbsoluteFill
      style={{
        background: brand.colors.dark,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          left: `${x1}%`,
          top: `${y1}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${brand.colors.brand}aa, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          left: `${x2}%`,
          top: `${y2}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${brand.colors.brandDark}88, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fontFamily.display,
            fontSize: 64,
            color: brand.colors.white,
            opacity: 0.9,
          }}
        >
          {caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
