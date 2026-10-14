/**
 * LocalFeed brand tokens — aligned with localfeed-blog Tailwind theme.
 * brand: #E57B3C · brand-dark: #D4632C · dark: #080808
 */

export const brand = {
  name: "LocalFeed",
  colors: {
    brand: "#E57B3C",
    brandDark: "#D4632C",
    brandLight: "#F09A66",
    dark: "#080808",
    ink: "#141414",
    surface: "#161616",
    surfaceElevated: "#1F1F1F",
    muted: "#8A8A8A",
    soft: "#C8C8C8",
    white: "#FFFFFF",
    cream: "#F7F3EE",
    success: "#3D9A6A",
    alert: "#E24B4B",
  },
  fonts: {
    display: "Playfair Display",
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  radii: {
    sm: 8,
    md: 14,
    lg: 22,
    pill: 999,
  },
  video: {
    fps: 30,
    width: 1920,
    height: 1080,
    shortWidth: 1080,
    shortHeight: 1920,
  },
} as const;

export type BrandColors = typeof brand.colors;
