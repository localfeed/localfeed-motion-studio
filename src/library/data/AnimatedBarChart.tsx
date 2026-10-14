import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const animatedBarChartSchema = z.object({
  title: z.string(),
  bars: z
    .array(
      z.object({
        label: z.string(),
        value: z.number().min(0).max(100),
      }),
    )
    .min(1),
});

export type AnimatedBarChartProps = z.infer<typeof animatedBarChartSchema>;

export const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({ title, bars }) => {
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
      <h2
        style={{
          fontFamily: fontFamily.display,
          fontSize: 48,
          color: brand.colors.white,
          margin: "0 0 48px",
          opacity: springProgress({ frame, fps, delay: 2 }),
        }}
      >
        {title}
      </h2>
      <div style={{ display: "grid", gap: 22, maxWidth: 1100 }}>
        {bars.map((bar, i) => {
          const p = springProgress({ frame, fps, delay: 8 + i * 5 });
          const width = interpolate(p, [0, 1], [0, bar.value]);
          return (
            <div key={bar.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  fontFamily: fontFamily.sans,
                  fontSize: 22,
                  color: brand.colors.soft,
                }}
              >
                <span>{bar.label}</span>
                <span style={{ color: brand.colors.brand }}>{Math.round(width)}%</span>
              </div>
              <div
                style={{
                  height: 28,
                  borderRadius: 999,
                  background: "#ffffff12",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${width}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${brand.colors.brandDark}, ${brand.colors.brandLight})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
