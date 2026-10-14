import type { ComponentType } from "react";
import type { ZodTypeAny } from "zod";
import catalogueJson from "./catalogue.json";
import type { Catalogue, CatalogueEntry } from "./types";
import { KineticHeadline, kineticHeadlineSchema } from "../library/text/KineticHeadline";
import { TypewriterReveal, typewriterRevealSchema } from "../library/text/TypewriterReveal";
import { WordCascade, wordCascadeSchema } from "../library/text/WordCascade";
import { CounterStat, counterStatSchema } from "../library/text/CounterStat";
import { LowerThirdBar, lowerThirdBarSchema } from "../library/lower-thirds/LowerThirdBar";
import { LowerThirdPill, lowerThirdPillSchema } from "../library/lower-thirds/LowerThirdPill";
import {
  BreakingNewsBanner,
  breakingNewsBannerSchema,
} from "../library/lower-thirds/BreakingNewsBanner";
import { WipeReveal, wipeRevealSchema } from "../library/transitions/WipeReveal";
import { ZoomPunch, zoomPunchSchema } from "../library/transitions/ZoomPunch";
import { StaggerGrid, staggerGridSchema } from "../library/transitions/StaggerGrid";
import { FeedCardStack, feedCardStackSchema } from "../library/social/FeedCardStack";
import { StoryRing, storyRingSchema } from "../library/social/StoryRing";
import { NotificationPop, notificationPopSchema } from "../library/social/NotificationPop";
import { LogoReveal, logoRevealSchema } from "../library/product/LogoReveal";
import { BrandColorSweep, brandColorSweepSchema } from "../library/product/BrandColorSweep";
import { FeatureShowcase, featureShowcaseSchema } from "../library/product/FeatureShowcase";
import { AppPhoneMock, appPhoneMockSchema } from "../library/product/AppPhoneMock";
import { AnimatedBarChart, animatedBarChartSchema } from "../library/data/AnimatedBarChart";
import { ProgressRing, progressRingSchema } from "../library/data/ProgressRing";
import { GradientMesh, gradientMeshSchema } from "../library/backgrounds/GradientMesh";
import { GridPulse, gridPulseSchema } from "../library/backgrounds/GridPulse";
import { ParticleDrift, particleDriftSchema } from "../library/backgrounds/ParticleDrift";
import { GalleryReel } from "../compositions/GalleryReel";
import { CatalogueBrowser, catalogueBrowserSchema } from "../compositions/CatalogueBrowser";

export const catalogue = catalogueJson as Catalogue;

type RegistryItem = {
  entry: CatalogueEntry;
  component: ComponentType<Record<string, unknown>>;
  schema?: ZodTypeAny;
};

const componentMap: Record<
  string,
  { component: ComponentType<any>; schema?: ZodTypeAny }
> = {
  KineticHeadline: { component: KineticHeadline, schema: kineticHeadlineSchema },
  TypewriterReveal: { component: TypewriterReveal, schema: typewriterRevealSchema },
  WordCascade: { component: WordCascade, schema: wordCascadeSchema },
  CounterStat: { component: CounterStat, schema: counterStatSchema },
  LowerThirdBar: { component: LowerThirdBar, schema: lowerThirdBarSchema },
  LowerThirdPill: { component: LowerThirdPill, schema: lowerThirdPillSchema },
  BreakingNewsBanner: {
    component: BreakingNewsBanner,
    schema: breakingNewsBannerSchema,
  },
  WipeReveal: { component: WipeReveal, schema: wipeRevealSchema },
  ZoomPunch: { component: ZoomPunch, schema: zoomPunchSchema },
  StaggerGrid: { component: StaggerGrid, schema: staggerGridSchema },
  FeedCardStack: { component: FeedCardStack, schema: feedCardStackSchema },
  StoryRing: { component: StoryRing, schema: storyRingSchema },
  NotificationPop: { component: NotificationPop, schema: notificationPopSchema },
  LogoReveal: { component: LogoReveal, schema: logoRevealSchema },
  BrandColorSweep: { component: BrandColorSweep, schema: brandColorSweepSchema },
  FeatureShowcase: { component: FeatureShowcase, schema: featureShowcaseSchema },
  AppPhoneMock: { component: AppPhoneMock, schema: appPhoneMockSchema },
  AnimatedBarChart: { component: AnimatedBarChart, schema: animatedBarChartSchema },
  ProgressRing: { component: ProgressRing, schema: progressRingSchema },
  GradientMesh: { component: GradientMesh, schema: gradientMeshSchema },
  GridPulse: { component: GridPulse, schema: gridPulseSchema },
  ParticleDrift: { component: ParticleDrift, schema: particleDriftSchema },
  GalleryReel: { component: GalleryReel },
  CatalogueBrowser: {
    component: CatalogueBrowser,
    schema: catalogueBrowserSchema,
  },
};

export function getRegistry(): RegistryItem[] {
  return catalogue.entries.map((entry) => {
    const mapped = componentMap[entry.compositionId];
    if (!mapped) {
      throw new Error(`Missing component for ${entry.compositionId}`);
    }
    return {
      entry,
      component: mapped.component,
      schema: mapped.schema,
    };
  });
}
