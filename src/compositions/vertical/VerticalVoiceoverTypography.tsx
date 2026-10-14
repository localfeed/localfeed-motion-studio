import React from "react";
import {
  AbsoluteFill,
  Audio,
  CalculateMetadataFunction,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { brand } from "../../brand/tokens";
import { fontFamily } from "../../brand/fonts";

const timedWordSchema = z.object({
  text: z.string(),
  /** Start time in seconds (voice-over aligned). */
  startSec: z.number().min(0),
  /** End time in seconds. */
  endSec: z.number().min(0),
  /** Emphasize with accent color + zoom. */
  emphasis: z.boolean().optional(),
  /** Font role for this word. */
  role: z.enum(["display", "sans", "mono"]).optional(),
});

const sfxCueSchema = z.object({
  /** Seconds into the composition. */
  atSec: z.number().min(0),
  /** Path under public/, e.g. audio/swoosh.mp3 */
  src: z.string(),
  volume: z.number().min(0).max(1).optional(),
});

export const verticalVoiceoverTypographySchema = z.object({
  eyebrow: z.string(),
  words: z.array(timedWordSchema).min(1),
  /** Voice-over file under public/. Empty = silent preview. */
  voiceoverSrc: z.string().optional(),
  voiceoverVolume: z.number().min(0).max(1).optional(),
  /** Optional short SFX cues. */
  sfxCues: z.array(sfxCueSchema).optional(),
  background: z.string().optional(),
  cream: z.string().optional(),
  accent: z.string().optional(),
  accentDark: z.string().optional(),
  showProgress: z.boolean().optional(),
});

export type VerticalVoiceoverTypographyProps = z.infer<
  typeof verticalVoiceoverTypographySchema
>;

export const verticalVoiceoverTypographyDefaults: VerticalVoiceoverTypographyProps =
  {
    eyebrow: "LocalFeed · Voice-over",
    words: [
      { text: "Neighborhood", startSec: 0.2, endSec: 1.1, role: "display" },
      {
        text: "stories",
        startSec: 1.15,
        endSec: 1.9,
        role: "display",
        emphasis: true,
      },
      { text: "with", startSec: 2.0, endSec: 2.35, role: "sans" },
      {
        text: "clear",
        startSec: 2.4,
        endSec: 3.0,
        role: "sans",
        emphasis: true,
      },
      { text: "emphasis.", startSec: 3.05, endSec: 3.9, role: "display" },
    ],
    voiceoverSrc: "",
    voiceoverVolume: 1,
    sfxCues: [],
    background: brand.colors.dark,
    cream: brand.colors.cream,
    accent: brand.colors.brand,
    accentDark: brand.colors.brandDark,
    showProgress: true,
  };

export const calculateVerticalVoiceoverMetadata: CalculateMetadataFunction<
  VerticalVoiceoverTypographyProps
> = ({ props }) => {
  const words = props.words?.length
    ? props.words
    : verticalVoiceoverTypographyDefaults.words;
  const lastEnd = Math.max(...words.map((w) => w.endSec), 3.5);
  const fps = brand.video.fps;
  return {
    durationInFrames: Math.ceil((lastEnd + 0.8) * fps),
    fps,
    width: brand.video.shortWidth,
    height: brand.video.shortHeight,
  };
};

const roleFont = (role: "display" | "sans" | "mono" = "display") => {
  if (role === "sans") return fontFamily.sans;
  if (role === "mono") return fontFamily.mono;
  return fontFamily.display;
};

const TimedWord: React.FC<{
  word: z.infer<typeof timedWordSchema>;
  cream: string;
  accent: string;
  index: number;
}> = ({ word, cream, accent, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = Math.round(word.startSec * fps);
  const end = Math.round(word.endSec * fps);

  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.85 },
  });

  const hold = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const visible = frame >= start - 2;
  const zoom = word.emphasis
    ? interpolate(enter, [0, 1], [0.92, 1.05]) *
      interpolate(hold, [0, 0.45, 1], [1, 1.035, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : interpolate(enter, [0, 1], [0.97, 1]);

  const opacity = visible ? interpolate(enter, [0, 1], [0, 1]) : 0;
  const y = interpolate(enter, [0, 1], [24, 0]);

  return (
    <span
      style={{
        display: "inline-block",
        marginRight: 16,
        marginBottom: 14,
        fontFamily: roleFont(word.role),
        fontSize: word.emphasis ? 76 : 62,
        fontWeight: word.emphasis ? 700 : 600,
        lineHeight: 1.15,
        letterSpacing: word.role === "display" ? -1.2 : -0.3,
        color: word.emphasis ? accent : cream,
        opacity,
        transform: `translateY(${y}px) scale(${zoom})`,
        transformOrigin: "left center",
      }}
    >
      {word.text}
      {word.emphasis ? (
        <span
          style={{
            display: "block",
            height: 4,
            marginTop: 8,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${accent}, ${brand.colors.brandDark})`,
            width: `${interpolate(enter, [0, 1], [0, 100])}%`,
          }}
        />
      ) : null}
    </span>
  );
};

/**
 * Vertical (1080×1920) editorial typography driven by voice-over timing.
 * Restrained LocalFeed look — subtle zoom, accents, optional VO/SFX.
 */
export const VerticalVoiceoverTypography: React.FC<
  VerticalVoiceoverTypographyProps
> = (props) => {
  const {
    eyebrow = verticalVoiceoverTypographyDefaults.eyebrow!,
    words = verticalVoiceoverTypographyDefaults.words!,
    voiceoverSrc = "",
    voiceoverVolume = 1,
    sfxCues = [],
    background = brand.colors.dark,
    cream = brand.colors.cream,
    accent = brand.colors.brand,
    accentDark = brand.colors.brandDark,
    showProgress = true,
  } = props;

  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const lastEnd = Math.max(...words.map((w) => w.endSec), 1);
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });
  const cameraZoom = interpolate(frame, [0, durationInFrames], [1, 1.035], {
    extrapolateRight: "clamp",
  });

  const emphasisWord = words.find((w) => w.emphasis);
  const swooshOpacity = emphasisWord
    ? interpolate(
        frame,
        [
          Math.round(emphasisWord.startSec * fps) - 2,
          Math.round(emphasisWord.startSec * fps) + 8,
          Math.round(emphasisWord.endSec * fps),
        ],
        [0, 0.32, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 0;

  return (
    <AbsoluteFill style={{ background, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 18%, ${accentDark}33 0%, transparent 55%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -40,
          right: -40,
          top: "44%",
          height: 2,
          opacity: swooshOpacity,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          transform: `scaleX(${interpolate(swooshOpacity, [0, 0.32], [0.45, 1])})`,
        }}
      />

      <AbsoluteFill
        style={{
          transform: `scale(${cameraZoom})`,
          transformOrigin: "center center",
          padding: "120px 72px 160px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: accent,
            marginBottom: 36,
            opacity: interpolate(frame, [0, 12], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            maxWidth: width - 144,
          }}
        >
          {words.map((word, i) => (
            <TimedWord
              key={`${word.text}-${i}`}
              word={word}
              cream={cream}
              accent={accent}
              index={i}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            fontFamily: fontFamily.mono,
            fontSize: 18,
            color: `${cream}99`,
            opacity: interpolate(frame, [18, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {width}×{height} · voice-led · {lastEnd.toFixed(1)}s copy
        </div>
      </AbsoluteFill>

      {showProgress ? (
        <div
          style={{
            position: "absolute",
            left: 72,
            right: 72,
            bottom: 72,
            height: 3,
            background: "#ffffff14",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${accentDark}, ${accent})`,
            }}
          />
        </div>
      ) : null}

      {voiceoverSrc ? (
        <Audio src={staticFile(voiceoverSrc)} volume={voiceoverVolume} />
      ) : null}

      {sfxCues.map((cue, i) =>
        cue.src ? (
          <Sequence
            key={`sfx-${i}-${cue.atSec}`}
            from={Math.round(cue.atSec * fps)}
            layout="none"
          >
            <Audio src={staticFile(cue.src)} volume={cue.volume ?? 0.55} />
          </Sequence>
        ) : null,
      )}
    </AbsoluteFill>
  );
};
