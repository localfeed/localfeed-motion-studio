import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";

export const typewriterRevealSchema = z.object({
  text: z.string(),
  charsPerSecond: z.number().default(18),
  background: z.string().optional(),
});

export type TypewriterRevealProps = z.infer<typeof typewriterRevealSchema>;

export const TypewriterReveal: React.FC<TypewriterRevealProps> = ({
  text,
  charsPerSecond = 18,
  background = brand.colors.ink,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.min(
    text.length,
    Math.floor((frame / fps) * charsPerSecond),
  );
  const caretOpacity = Math.round(frame / 8) % 2 === 0 ? 1 : 0.15;
  const caret = "|";

  return (
    <AbsoluteFill
      style={{
        background,
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          fontFamily: fontFamily.mono,
          fontSize: 48,
          lineHeight: 1.4,
          color: brand.colors.cream,
        }}
      >
        {text.slice(0, count)}
        <span style={{ opacity: caretOpacity, color: brand.colors.brand }}>
          {caret}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 100,
          right: 100,
          height: 4,
          background: "#ffffff18",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${interpolate(count, [0, text.length], [0, 100])}%`,
            height: "100%",
            background: brand.colors.brand,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
