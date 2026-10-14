import { interpolate, spring, type SpringConfig } from "remotion";

export type PartialSpring = Partial<SpringConfig>;

export const softSpring: PartialSpring = {
  damping: 18,
  stiffness: 120,
  mass: 0.9,
};
export const snappySpring: PartialSpring = {
  damping: 14,
  stiffness: 180,
  mass: 0.7,
};
export const heavySpring: PartialSpring = {
  damping: 22,
  stiffness: 90,
  mass: 1.2,
};

export function springProgress({
  frame,
  fps,
  delay = 0,
  config = softSpring,
}: {
  frame: number;
  fps: number;
  delay?: number;
  config?: PartialSpring;
}) {
  return spring({
    frame: frame - delay,
    fps,
    config,
  });
}

export function fadeUp(
  frame: number,
  fps: number,
  delay = 0,
  distance = 40,
) {
  const p = springProgress({ frame, fps, delay });
  return {
    opacity: interpolate(p, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(p, [0, 1], [distance, 0])}px)`,
  };
}

export function fadeIn(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function clampMap(
  frame: number,
  input: [number, number],
  output: [number, number],
) {
  return interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function staggerDelay(index: number, step = 4) {
  return index * step;
}
