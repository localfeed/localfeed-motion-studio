import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "./tokens";
import { fontFamily } from "./fonts";

export type LogoProps = {
  variant?: "mark" | "wordmark" | "lockup";
  color?: string;
  animate?: boolean;
};

export const LocalFeedLogo: React.FC<LogoProps> = ({
  variant = "lockup",
  color = brand.colors.white,
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = animate
    ? spring({ frame, fps, config: { damping: 16, stiffness: 120 } })
    : 1;

  const scale = interpolate(progress, [0, 1], [0.82, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {(variant === "mark" || variant === "lockup") && (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: `linear-gradient(145deg, ${brand.colors.brandLight}, ${brand.colors.brandDark})`,
            display: "grid",
            placeItems: "center",
            boxShadow: `0 12px 40px ${brand.colors.brand}55`,
          }}
        >
          <span
            style={{
              fontFamily: fontFamily.display,
              fontWeight: 700,
              fontSize: 30,
              color: brand.colors.dark,
              lineHeight: 1,
            }}
          >
            Lf
          </span>
        </div>
      )}
      {(variant === "wordmark" || variant === "lockup") && (
        <span
          style={{
            fontFamily: fontFamily.display,
            fontWeight: 600,
            fontSize: 42,
            letterSpacing: -0.5,
            color,
          }}
        >
          LocalFeed
        </span>
      )}
    </div>
  );
};

export const LogoCentered: React.FC<LogoProps> = (props) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      background: brand.colors.dark,
    }}
  >
    <LocalFeedLogo {...props} />
  </AbsoluteFill>
);
