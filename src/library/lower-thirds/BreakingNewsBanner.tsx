import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const breakingNewsBannerSchema = z.object({
  headline: z.string(),
  ticker: z.string(),
});

export type BreakingNewsBannerProps = z.infer<typeof breakingNewsBannerSchema>;

export const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({
  headline,
  ticker,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const p = springProgress({ frame, fps, delay: 2 });
  const scroll = interpolate(frame, [0, 120], [width, -width * 0.6]);

  return (
    <AbsoluteFill style={{ background: brand.colors.dark }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          transform: `translateY(${interpolate(p, [0, 1], [120, 0])}px)`,
        }}
      >
        <div
          style={{
            background: brand.colors.alert,
            color: brand.colors.white,
            fontFamily: fontFamily.sans,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 3,
            padding: "10px 28px",
            textTransform: "uppercase",
            display: "inline-block",
          }}
        >
          Breaking
        </div>
        <div
          style={{
            background: brand.colors.surface,
            padding: "22px 28px",
            fontFamily: fontFamily.display,
            fontSize: 42,
            color: brand.colors.white,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            background: brand.colors.brand,
            overflow: "hidden",
            whiteSpace: "nowrap",
            padding: "12px 0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: `translateX(${scroll}px)`,
              fontFamily: fontFamily.sans,
              fontSize: 22,
              fontWeight: 600,
              color: brand.colors.dark,
            }}
          >
            {ticker} · {ticker}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
