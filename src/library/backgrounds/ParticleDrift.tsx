import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";

export const particleDriftSchema = z.object({
  title: z.string().optional(),
});

export type ParticleDriftProps = z.infer<typeof particleDriftSchema>;

/** Deterministic pseudo-random from index — render-safe, no Math.random(). */
function hash(n: number) {
  const x = Math.sin(n * 999) * 10000;
  return x - Math.floor(x);
}

export const ParticleDrift: React.FC<ParticleDriftProps> = ({
  title = "Stories in the air",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const particles = Array.from({ length: 36 }).map((_, i) => {
    const x0 = hash(i + 1) * width;
    const y0 = hash(i + 17) * height;
    const speed = 0.4 + hash(i + 33) * 1.4;
    const size = 4 + hash(i + 51) * 10;
    return { x0, y0, speed, size, i };
  });

  return (
    <AbsoluteFill style={{ background: brand.colors.dark, overflow: "hidden" }}>
      {particles.map((p) => {
        const y = (p.y0 - frame * p.speed * 4 + height * 4) % height;
        const x = p.x0 + Math.sin((frame + p.i * 8) / 20) * 30;
        const opacity = interpolate(Math.sin((frame + p.i) / 15), [-1, 1], [0.2, 0.9]);
        return (
          <div
            key={p.i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: brand.colors.brand,
              opacity,
              boxShadow: `0 0 12px ${brand.colors.brand}`,
            }}
          />
        );
      })}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fontFamily.display,
            fontSize: 64,
            color: brand.colors.white,
          }}
        >
          {title}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
