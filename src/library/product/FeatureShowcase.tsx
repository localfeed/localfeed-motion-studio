import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const featureShowcaseSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  features: z.array(z.string()).min(1),
});

export type FeatureShowcaseProps = z.infer<typeof featureShowcaseSchema>;

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  eyebrow,
  title,
  features,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: brand.colors.dark,
        padding: 100,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 20,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: brand.colors.brand,
          fontWeight: 700,
          opacity: springProgress({ frame, fps, delay: 2 }),
        }}
      >
        {eyebrow}
      </div>
      <h1
        style={{
          fontFamily: fontFamily.display,
          fontSize: 72,
          color: brand.colors.white,
          margin: "18px 0 48px",
          maxWidth: 900,
          opacity: springProgress({ frame, fps, delay: 6 }),
          transform: `translateY(${interpolate(springProgress({ frame, fps, delay: 6 }), [0, 1], [24, 0])}px)`,
        }}
      >
        {title}
      </h1>
      <div style={{ display: "grid", gap: 18, maxWidth: 760 }}>
        {features.map((feature, i) => {
          const p = springProgress({ frame, fps, delay: 12 + i * 6 });
          return (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                opacity: p,
                transform: `translateX(${interpolate(p, [0, 1], [-30, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: brand.colors.brand,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: fontFamily.sans,
                  fontSize: 30,
                  color: brand.colors.cream,
                }}
              >
                {feature}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
