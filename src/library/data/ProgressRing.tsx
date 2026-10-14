import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const progressRingSchema = z.object({
  percent: z.number().min(0).max(100),
  label: z.string(),
});

export type ProgressRingProps = z.infer<typeof progressRingSchema>;

export const ProgressRing: React.FC<ProgressRingProps> = ({ percent, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springProgress({
    frame,
    fps,
    delay: 4,
    config: { damping: 18, stiffness: 70, mass: 1 },
  });
  const value = interpolate(p, [0, 1], [0, percent]);
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <AbsoluteFill
      style={{
        background: brand.colors.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg width="360" height="360" viewBox="0 0 360 360">
        <circle
          cx="180"
          cy="180"
          r={radius}
          fill="none"
          stroke="#ffffff14"
          strokeWidth="22"
        />
        <circle
          cx="180"
          cy="180"
          r={radius}
          fill="none"
          stroke={brand.colors.brand}
          strokeWidth="22"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 180 180)"
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div
          style={{
            fontFamily: fontFamily.display,
            fontSize: 72,
            fontWeight: 700,
            color: brand.colors.white,
          }}
        >
          {Math.round(value)}%
        </div>
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 24,
            color: brand.colors.soft,
            marginTop: 6,
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
