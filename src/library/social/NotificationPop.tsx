import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";
import { springProgress } from "../../lib/motion";

export const notificationPopSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export type NotificationPopProps = z.infer<typeof notificationPopSchema>;

export const NotificationPop: React.FC<NotificationPopProps> = ({ title, body }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springProgress({
    frame,
    fps,
    delay: 6,
    config: { damping: 12, stiffness: 160, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1b1410 0%, ${brand.colors.dark} 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 120,
      }}
    >
      <div
        style={{
          width: 560,
          background: brand.colors.surfaceElevated,
          borderRadius: 24,
          padding: 24,
          display: "flex",
          gap: 18,
          transform: `translateY(${interpolate(p, [0, 1], [-80, 0])}px) scale(${interpolate(p, [0, 1], [0.9, 1])})`,
          opacity: p,
          boxShadow: `0 24px 80px ${brand.colors.brand}33`,
          border: `1px solid ${brand.colors.brand}44`,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: brand.colors.brand,
            display: "grid",
            placeItems: "center",
            fontFamily: fontFamily.display,
            fontWeight: 700,
            color: brand.colors.dark,
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          Lf
        </div>
        <div>
          <div
            style={{
              fontFamily: fontFamily.sans,
              fontWeight: 700,
              fontSize: 22,
              color: brand.colors.white,
              marginBottom: 6,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: fontFamily.sans,
              fontSize: 20,
              color: brand.colors.soft,
              lineHeight: 1.35,
            }}
          >
            {body}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
