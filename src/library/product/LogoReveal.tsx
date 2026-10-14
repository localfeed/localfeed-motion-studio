import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { LocalFeedLogo } from "../../brand/Logo";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const logoRevealSchema = z.object({
  tagline: z.string().optional(),
});

export type LogoRevealProps = z.infer<typeof logoRevealSchema>;

export const LogoReveal: React.FC<LogoRevealProps> = ({
  tagline = "Your neighborhood, in motion",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sweep = interpolate(springProgress({ frame, fps, delay: 2 }), [0, 1], [0, 100]);

  return (
    <AbsoluteFill style={{ background: brand.colors.dark }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(120deg, ${brand.colors.brandDark}55, transparent 45%, ${brand.colors.brand}33)`,
          clipPath: `inset(0 ${100 - sweep}% 0 0)`,
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 28 }}>
        <LocalFeedLogo variant="lockup" />
        <p
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 28,
            color: brand.colors.soft,
            opacity: springProgress({ frame, fps, delay: 14 }),
            margin: 0,
          }}
        >
          {tagline}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
