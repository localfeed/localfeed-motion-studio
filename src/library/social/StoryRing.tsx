import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const storyRingSchema = z.object({
  labels: z.array(z.string()).min(1),
});

export type StoryRingProps = z.infer<typeof storyRingSchema>;

export const StoryRing: React.FC<StoryRingProps> = ({ labels }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sweep = interpolate(frame, [0, 60], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        background: brand.colors.dark,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 36,
      }}
    >
      {labels.map((label, i) => {
        const p = springProgress({ frame, fps, delay: i * 5 });
        return (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                padding: 4,
                background: `conic-gradient(from ${sweep}deg, ${brand.colors.brand}, ${brand.colors.brandLight}, ${brand.colors.brandDark}, ${brand.colors.brand})`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: brand.colors.surface,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: fontFamily.sans,
                  fontWeight: 700,
                  fontSize: 28,
                  color: brand.colors.white,
                }}
              >
                {label.slice(0, 1).toUpperCase()}
              </div>
            </div>
            <span
              style={{
                fontFamily: fontFamily.sans,
                fontSize: 20,
                color: brand.colors.soft,
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
