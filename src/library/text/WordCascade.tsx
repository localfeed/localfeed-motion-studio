import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const wordCascadeSchema = z.object({
  lines: z.array(z.string()).min(1),
  background: z.string().optional(),
});

export type WordCascadeProps = z.infer<typeof wordCascadeSchema>;

export const WordCascade: React.FC<WordCascadeProps> = ({
  lines,
  background = brand.colors.dark,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background,
        justifyContent: "center",
        paddingLeft: 120,
        gap: 18,
      }}
    >
      {lines.map((line, i) => {
        const p = springProgress({ frame, fps, delay: 6 + i * 8 });
        return (
          <div
            key={line}
            style={{
              fontFamily: fontFamily.display,
              fontSize: i === 0 ? 88 : 56,
              fontWeight: i === 0 ? 700 : 500,
              color: i === 0 ? brand.colors.white : brand.colors.brand,
              opacity: p,
              transform: `translateX(${interpolate(p, [0, 1], [-80, 0])}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
