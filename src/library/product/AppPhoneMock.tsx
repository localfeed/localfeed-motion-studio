import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const appPhoneMockSchema = z.object({
  headline: z.string(),
  feedItems: z.array(z.string()).min(1),
});

export type AppPhoneMockProps = z.infer<typeof appPhoneMockSchema>;

export const AppPhoneMock: React.FC<AppPhoneMockProps> = ({ headline, feedItems }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springProgress({ frame, fps, delay: 4 });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 70% 30%, ${brand.colors.brand}33, ${brand.colors.dark} 60%)`,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 80,
        padding: 80,
      }}
    >
      <div style={{ maxWidth: 560, opacity: springProgress({ frame, fps, delay: 2 }) }}>
        <h1
          style={{
            fontFamily: fontFamily.display,
            fontSize: 64,
            color: brand.colors.white,
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {headline}
        </h1>
      </div>
      <div
        style={{
          width: 340,
          height: 680,
          borderRadius: 44,
          background: "#111",
          border: "10px solid #2a2a2a",
          boxShadow: "0 40px 100px #00000099",
          overflow: "hidden",
          transform: `translateY(${interpolate(p, [0, 1], [60, 0])}px) rotate(${interpolate(p, [0, 1], [8, 0])}deg)`,
          opacity: p,
        }}
      >
        <div
          style={{
            height: 54,
            background: brand.colors.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fontFamily.display,
            color: brand.colors.brand,
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          LocalFeed
        </div>
        <div style={{ padding: 18, display: "grid", gap: 12 }}>
          {feedItems.map((item, i) => {
            const itemP = springProgress({ frame, fps, delay: 12 + i * 5 });
            return (
              <div
                key={item}
                style={{
                  background: brand.colors.surfaceElevated,
                  borderRadius: 16,
                  padding: 16,
                  opacity: itemP,
                  transform: `translateY(${interpolate(itemP, [0, 1], [20, 0])}px)`,
                }}
              >
                <div
                  style={{
                    height: 8,
                    width: 64,
                    borderRadius: 999,
                    background: brand.colors.brand,
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    fontFamily: fontFamily.sans,
                    fontSize: 18,
                    color: brand.colors.cream,
                    lineHeight: 1.3,
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
