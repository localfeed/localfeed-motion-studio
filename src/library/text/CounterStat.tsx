import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const counterStatSchema = z.object({
  value: z.number(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  label: z.string(),
  background: z.string().optional(),
});

export type CounterStatProps = z.infer<typeof counterStatSchema>;

export const CounterStat: React.FC<CounterStatProps> = ({
  value,
  prefix = "",
  suffix = "",
  label,
  background = brand.colors.dark,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springProgress({
    frame,
    fps,
    delay: 4,
    config: { damping: 20, stiffness: 80, mass: 1 },
  });
  const current = Math.round(interpolate(p, [0, 1], [0, value]));

  return (
    <AbsoluteFill
      style={{
        background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.display,
          fontSize: 160,
          fontWeight: 700,
          color: brand.colors.brand,
          letterSpacing: -2,
        }}
      >
        {prefix}
        {current.toLocaleString()}
        {suffix}
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: fontFamily.sans,
          fontSize: 36,
          color: brand.colors.soft,
          opacity: springProgress({ frame, fps, delay: 12 }),
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};
