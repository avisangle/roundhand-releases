// Design tokens that have to live in TypeScript rather than CSS. Colours belong in
// app/globals.css; see DESIGN.md for the whole system.

// Browser chrome colour. Metadata needs a literal, so this is the one colour kept
// outside globals.css. It must equal --panel (surface.panel).
export const BROWSER_CHROME = "#fcfbf9";

// Motion, from the app's motion.* and state.* tokens.
const EASE_OUT = [0, 0, 0.58, 1] as const; // motion.transition.curve
const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const; // motion.breathe.curve

export const MOTION = {
  // The pill's appear, state change and dismiss.
  transition: { duration: 0.2, ease: EASE_OUT },
  // One breathe cycle of the recording dot.
  breathe: { duration: 2.4, ease: EASE_IN_OUT, scale: 1.5, opacity: 0.55 },
  // How long a settled pill holds before it leaves, in ms.
  dwellMs: 1200,
  // Text landing (success confirmation).
  success: { duration: 0.32, ease: EASE_OUT },
  // Dot opacity once text has landed.
  settledDot: 0.4,
  // A hover reveal (row highlight, card lift) and a focus ring appearing, in seconds.
  hover: 0.15,
  focus: 0.12,
} as const;
