import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const kineticHeadlineSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  accent: z.string().optional(),
  background: z.string().optional(),
});

export type KineticHeadlineProps = z.infer<typeof kineticHeadlineSchema>;

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  title,
  subtitle = "Local stories, closer to home",
  accent = brand.colors.brand,
  background = brand.colors.dark,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = title.split(" ");

  return (
    <AbsoluteFill
      style={{
        background,
        justifyContent: "center",
        padding: 120,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35em 0.4em", maxWidth: 1400 }}>
        {words.map((word, i) => {
          const p = springProgress({ frame, fps, delay: i * 3 });
          return (
            <span
              key={`${word}-${i}`}
              style={{
                fontFamily: fontFamily.display,
                fontSize: 96,
                fontWeight: 700,
                color: brand.colors.white,
                opacity: p,
                transform: `translateY(${interpolate(p, [0, 1], [48, 0])}px)`,
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 36,
          height: 6,
          width: interpolate(springProgress({ frame, fps, delay: 12 }), [0, 1], [0, 180]),
          background: accent,
          borderRadius: 999,
        }}
      />
      <p
        style={{
          marginTop: 28,
          fontFamily: fontFamily.sans,
          fontSize: 32,
          color: brand.colors.soft,
          opacity: springProgress({ frame, fps, delay: 16 }),
        }}
      >
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};
