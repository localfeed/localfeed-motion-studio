import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const feedCardStackSchema = z.object({
  cards: z
    .array(
      z.object({
        neighborhood: z.string(),
        title: z.string(),
        time: z.string(),
      }),
    )
    .min(1),
});

export type FeedCardStackProps = z.infer<typeof feedCardStackSchema>;

export const FeedCardStack: React.FC<FeedCardStackProps> = ({ cards }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at top, #1a120e 0%, ${brand.colors.dark} 55%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: 720, position: "relative", height: 520 }}>
        {cards.map((card, i) => {
          const p = springProgress({ frame, fps, delay: i * 8 });
          const y = i * 28;
          const scale = 1 - i * 0.04;
          return (
            <div
              key={`${card.title}-${i}`}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: y,
                transform: `translateY(${interpolate(p, [0, 1], [60, 0])}px) scale(${scale})`,
                opacity: interpolate(p, [0, 1], [0, 1 - i * 0.12]),
                background: brand.colors.surfaceElevated,
                borderRadius: brand.radii.lg,
                padding: 28,
                border: `1px solid ${brand.colors.brand}33`,
                zIndex: cards.length - i,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  fontFamily: fontFamily.sans,
                  fontSize: 18,
                  color: brand.colors.brand,
                  fontWeight: 600,
                }}
              >
                <span>{card.neighborhood}</span>
                <span style={{ color: brand.colors.muted }}>{card.time}</span>
              </div>
              <div
                style={{
                  fontFamily: fontFamily.display,
                  fontSize: 34,
                  color: brand.colors.white,
                  lineHeight: 1.25,
                }}
              >
                {card.title}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
