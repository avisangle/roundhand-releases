"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Hash, Mail, NotebookPen } from "lucide-react";
import { MOTION } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type Scene = {
  app: string;
  icon: typeof Hash;
  context: string;
  spoken: string;
  written: string[];
};

// Each scene shows the same speech-to-text pipeline landing in a different app,
// so the tone of the written output changes with the destination.
const SCENES: Scene[] = [
  {
    app: "Slack",
    icon: Hash,
    context: "# design-review",
    spoken: "um so can we uh push the review to thursday i think we need like one more day",
    written: ["Can we push the review to Thursday? I think we need one more day."],
  },
  {
    app: "Mail",
    icon: Mail,
    context: "To: Priya Raman",
    spoken: "hi priya thanks for sending the contract over um i'll have my comments back to you by friday",
    written: [
      "Hi Priya,",
      "Thanks for sending the contract over. I'll have my comments back to you by Friday.",
      "Best,",
    ],
  },
  {
    app: "Notes",
    icon: NotebookPen,
    context: "Saturday",
    spoken: "okay shopping list eggs oat milk uh spinach and coffee beans",
    written: ["Shopping list", "• Eggs", "• Oat milk", "• Spinach", "• Coffee beans"],
  },
];

type Phase = "listening" | "polishing" | "inserted";

const PILL_LABEL: Record<Phase, string> = {
  listening: "Listening",
  polishing: "Tidying",
  inserted: "Inserted",
};

// Demo pacing. The pill's own timings come from MOTION (the app's motion tokens).
const WORD_MS = 170;
const POLISH_MS = 900;
const HOLD_MS = 3400;

export function DictationDemo() {
  const reduceMotion = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("listening");
  const [wordCount, setWordCount] = useState(0);
  const [pillGone, setPillGone] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const scene = SCENES[sceneIndex];
  const words = scene.spoken.split(" ");

  // Drive the listening -> polishing -> inserted loop. Stops once the visitor picks a tab.
  useEffect(() => {
    if (reduceMotion) return;
    if (phase === "listening") {
      const t =
        wordCount < words.length
          ? setTimeout(() => setWordCount((n) => n + 1), WORD_MS)
          : setTimeout(() => setPhase("polishing"), 350);
      return () => clearTimeout(t);
    }
    if (phase === "polishing") {
      const t = setTimeout(() => setPhase("inserted"), POLISH_MS);
      return () => clearTimeout(t);
    }
    const dwell = setTimeout(() => setPillGone(true), MOTION.dwellMs);
    const next = autoplay
      ? setTimeout(() => {
          setSceneIndex((i) => (i + 1) % SCENES.length);
          setWordCount(0);
          setPillGone(false);
          setPhase("listening");
        }, HOLD_MS)
      : undefined;
    return () => {
      clearTimeout(dwell);
      clearTimeout(next);
    };
  }, [phase, wordCount, words.length, autoplay, reduceMotion]);

  function selectScene(i: number) {
    setAutoplay(false);
    setSceneIndex(i);
    setWordCount(0);
    setPillGone(false);
    setPhase("listening");
  }

  // With reduced motion the demo skips straight to the finished text; tabs still work.
  const shown: Phase = reduceMotion ? "inserted" : phase;
  const showPill = !reduceMotion && !(shown === "inserted" && pillGone);

  return (
    <figure>
      <figcaption className="sr-only">
        Illustration: while you speak, the Roundhand pill at the bottom of the screen shows
        what it hears. It tidies the words and inserts the finished text into {scene.app}.
      </figcaption>

      {/* The screen: desktop ground, menu bar, one app window, and the pill below it. */}
      <div className="relative overflow-hidden rounded-2xl bg-window shadow-modal">
        <div className="flex h-7 items-center justify-between bg-menubar px-3.5 text-[12px] text-foreground">
          <span className="font-semibold">{scene.app}</span>
          <span aria-hidden className="text-muted-foreground">
            Wed 9:41
          </span>
        </div>

        <div className="px-3 pt-3 pb-[76px] sm:px-5 sm:pt-5">
          <div className="overflow-hidden rounded-xl bg-background shadow-card">
            {/* App switcher, doubling as the demo's controls */}
            <div role="tablist" aria-label="Example apps" className="flex gap-1 border-b border-border px-2.5 pt-2">
              {SCENES.map((s, i) => {
                const Icon = s.icon;
                const selected = i === sceneIndex;
                return (
                  <button
                    key={s.app}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => selectScene(i)}
                    className={cn(
                      "-mb-px flex items-center gap-1.5 rounded-t-md border border-b-0 px-3 py-1.5 text-[13px] transition-colors duration-150",
                      selected
                        ? "border-border bg-card font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon aria-hidden className="size-3.5" />
                    {s.app}
                  </button>
                );
              })}
            </div>

            <div className="min-h-[216px] bg-card px-5 py-4 sm:min-h-[228px]">
              <p className="mb-3 text-[13px] text-muted-foreground">{scene.context}</p>
              <AnimatePresence mode="wait" initial={false}>
                {shown === "inserted" ? (
                  <motion.div
                    key={`written-${sceneIndex}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={MOTION.success}
                    className="space-y-1.5 text-[15px] leading-relaxed text-foreground"
                  >
                    {scene.written.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </motion.div>
                ) : (
                  <motion.span
                    key={`caret-${sceneIndex}`}
                    aria-hidden
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    className="block h-5 w-px animate-pulse bg-foreground"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
          <AnimatePresence>
            {showPill && (
              <motion.div
                key={`pill-${sceneIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={MOTION.transition}
              >
                <Pill phase={shown} partial={words.slice(0, wordCount).join(" ")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </figure>
  );
}

// The recording capsule, drawn from the app's pill tokens: surface.pill over a 24px
// saturated blur, elevation.pill and no border, 320×44, 20pt inset, a 9pt dot 12pt
// from its label, and the live partial in type.body. No waveform: the app refuses one.
function Pill({ phase, partial }: { phase: Phase; partial: string }) {
  return (
    <div className="flex h-11 w-[min(320px,calc(100vw-56px))] items-center gap-3 rounded-full bg-pill px-5 shadow-pill backdrop-blur-[24px] backdrop-saturate-[1.8]">
      <motion.span
        aria-hidden
        className="rust-gloss block size-[9px] shrink-0 rounded-full"
        animate={
          phase === "listening"
            ? { scale: [1, MOTION.breathe.scale, 1], opacity: [1, MOTION.breathe.opacity, 1] }
            : { scale: 1, opacity: phase === "inserted" ? MOTION.settledDot : 1 }
        }
        transition={
          phase === "listening"
            ? { duration: MOTION.breathe.duration, ease: MOTION.breathe.ease, repeat: Infinity }
            : MOTION.transition
        }
      />
      <span className="shrink-0 text-[13px] font-medium text-foreground">{PILL_LABEL[phase]}</span>
      {phase === "listening" && (
        // Right-aligned inside a clipped box, so the newest words stay visible and the
        // oldest slide off under a fade.
        <span className="flex min-w-0 flex-1 justify-end overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_28px)]">
          <span className="text-[13px] whitespace-nowrap text-muted-foreground">{partial}</span>
        </span>
      )}
    </div>
  );
}
