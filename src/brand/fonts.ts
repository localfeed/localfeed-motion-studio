import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const playfair = loadPlayfair("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});

const jetbrains = loadJetBrains("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const fontFamily = {
  sans: inter.fontFamily,
  display: playfair.fontFamily,
  mono: jetbrains.fontFamily,
};
