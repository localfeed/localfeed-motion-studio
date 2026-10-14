import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { brand } from "../brand/tokens";
import { KineticHeadline } from "../library/text/KineticHeadline";
import { LogoReveal } from "../library/product/LogoReveal";
import { FeedCardStack } from "../library/social/FeedCardStack";
import { LowerThirdBar } from "../library/lower-thirds/LowerThirdBar";
import { FeatureShowcase } from "../library/product/FeatureShowcase";
import { WipeReveal } from "../library/transitions/WipeReveal";

/**
 * Playable gallery reel — sequences flagship LocalFeed animations.
 * Scrub or play GalleryReel in Remotion Studio for a live preview.
 */
export const GalleryReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: brand.colors.dark }}>
      <Series>
        <Series.Sequence durationInFrames={60}>
          <LogoReveal tagline="LocalFeed Motion Studio" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <KineticHeadline
            title="Stories that move"
            subtitle="Reusable Remotion primitives for LocalFeed"
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FeedCardStack
            cards={[
              {
                neighborhood: "Harbor",
                title: "Night market lights the pier",
                time: "8m",
              },
              {
                neighborhood: "Eastside",
                title: "New mural on Cedar Ave",
                time: "21m",
              },
              {
                neighborhood: "Midtown",
                title: "Library expands weekend hours",
                time: "1h",
              },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <LowerThirdBar
            title="Harbor Jazz Night"
            location="Waterfront · Tonight"
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FeatureShowcase
            eyebrow="Studio"
            title="Ship motion faster"
            features={[
              "JSON-controlled compositions",
              "Searchable animation catalogue",
              "LocalFeed brand tokens baked in",
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <WipeReveal label="LocalFeed" />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
