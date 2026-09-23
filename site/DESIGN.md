# Roundhand design system (website)

The site uses the macOS app's v2 "Warm Editorial" tokens (app issue OR-167). This file
is the website's copy of that record. Follow it for every visual change, without being
asked. Implementation:

- **Colours, shadows, radii:** `app/globals.css` (`:root` and `@theme inline`). It is the
  only file that may contain a colour literal.
- **Motion and the metadata colour:** `lib/tokens.ts`.
- **Enforcement:** `npm run lint` runs `scripts/check-colors.mjs`. It fails on hex or `rgb()`
  values, Tailwind palette colours (`bg-white`, `text-red-500`), arbitrary colours
  (`bg-[#…]`, `bg-[var(--…)]`) and inline style colours anywhere else.

## Rules

1. **Rust is brand and chrome. Crimson is error.** Never put both on one surface. That is
   why the waitlist form's button is ink rather than rust: its error text is crimson.
2. **Light only.** The app's dark values are unreviewed (every one reads `TBD-OR-168`),
   so the site has no dark theme. Don't invent one.
3. **No waveforms, level meters or audio bars.** The app's design refuses them by name.
   Listening is shown by the breathing dot.
4. **The rust gloss is for primary elements only:** download buttons and the pill's dot.
   Use `.rust-gloss`.
5. **No success colour yet.** The app hasn't decided how success looks; only its timing
   (320ms) is fixed. Keep confirmations in ink.
6. **To use a colour that has no token,** add a role to the "Website roles" block in
   `globals.css`, derived from an existing token, and register it in `@theme inline`.

## Colour

| Tailwind name | CSS var | App token | Value | Use |
|---|---|---|---|---|
| `background` | `--panel` | surface.panel | `#fcfbf9` | Page ground |
| `card` | `--card-ground` | surface.card | `#f4f1ec` | Cards, alternate sections |
| `window`, `muted`, `secondary` | `--window` | surface.window | `#ece9e2` | Demo desktop, chips |
| `raised` | `--raised` | surface.raised | `rgb(0 0 0 / .045)` | Dense row tint |
| `scrim` | `--scrim` | surface.scrim | `rgb(36 38 44 / .32)` | Behind a modal |
| `border` | `--separator` | surface.separator | `rgb(0 0 0 / .09)` | Hairlines |
| `pill` | `--pill` | surface.pill | `rgb(255 255 255 / .86)` | The recording capsule |
| `pill-opaque` | `--pill-opaque` | surface.pill.opaque | `#f4f4f4` | Capsule under Increase Contrast |
| `foreground` | `--ink` | text.primary | `#24262c` | Text |
| `muted-foreground` | `--ink-secondary` | text.secondary | `rgb(36 38 44 / .70)` | Secondary text |
| `primary`, `rust` | `--rust` | accent.control | `#c15533` | Brand accent, icons, focus ring |
| (`.rust-gloss`) | `--rust-top` / `--rust-bottom` | gradient.primary | `#cb6746` → `#b04a2c` | Primary buttons, pill dot |
| `destructive` | `--crimson` | status.warning | `#c1121f` | Errors only |
| `dataviz-1` … `dataviz-4` | `--dataviz-*` | dataviz.1–4 | `#e7c2a8` `#d98c6a` `#c15533` `#9a3f28` | Charts, light to dark |
| `guide`, `input` | `--guide` | dataviz.empty | `#dad5ca` | Empty tracks, copybook lines, input borders |

Website-only roles, derived from the tokens above:

| Tailwind name | Derived from | Use |
|---|---|---|
| `rust-text` | dataviz.4 | Small rust text. Plain rust is too low-contrast on cream. |
| `menubar` | white at 45% | The demo's mock macOS menu bar |
| `deep`, `deep-fg`, `deep-muted`, `deep-rule` | ink, panel | The dark privacy section |
| `primary-foreground` | white | Text on rust |

## Elevation

Ascends card < raised < pill < modal. Use `shadow-card`, `shadow-raised`, `shadow-pill`,
`shadow-pill-opaque`, `shadow-modal`.

| Token | Value |
|---|---|
| elevation.card | `0 2px 8px rgb(0 0 0 / .06)`: a resting card |
| elevation.raised | `0 6px 16px rgb(0 0 0 / .10)`: hover or lifted card |
| elevation.pill | `0 6px 22px rgb(0 0 0 / .16)`: the pill; it has no border |
| elevation.pill.opaque | `0 6px 22px rgb(0 0 0 / .32)` |
| elevation.modal | `0 20px 48px rgb(0 0 0 / .20)`: the highest surface |

## Shape and space

| Token | Value | Tailwind |
|---|---|---|
| radius.control | 6pt | `rounded-lg` (`--radius`) |
| radius.menuRow | 9pt | none |
| radius.row | 12pt | `rounded-xl` |
| radius.card | 16pt | `rounded-2xl` |
| radius.capsule | height ÷ 2 | `rounded-full` |

Space: inline 4, itemGap 8, contentGap 12, rowInset 16, capsuleInset 20, cardInset 20,
sectionGap 24 (pt ≈ px).

## The pill

The pill is the app's recording capsule, and the hero demo reproduces it.

- **Placement:** bottom centre of the screen.
- **Size:** 320 × 44, fixed; it never grows with its content.
- **Surface:** `bg-pill` over a 24px backdrop blur at 180% saturation, `shadow-pill`, no
  border.
- **Layout:** 20px horizontal inset. A 9px dot sits 12px from the label.
- **Type:** the label is 13px medium; the live transcript is 13px regular in
  `muted-foreground`.
- **States:** Listening (the dot breathes), Tidying (the dot is still), then text lands
  (dot at 40% opacity). The pill holds for 1200ms, then leaves.

## Motion (`lib/tokens.ts` → `MOTION`)

| Token | Value |
|---|---|
| breathe | 2.4s ease-in-out cycle, scale 1.5, opacity 0.55 at mid-cycle |
| transition | 200ms, ease-out `[0, 0, .58, 1]`: pill appear, change, dismiss |
| dwell | 1200ms before a settled pill leaves |
| success | 320ms when text lands |
| hover | 150ms |
| focus | 120ms |
| spring | response 0.4s, damping 0.82 (app only; not in `MOTION`) |
| settledDot | 0.4 opacity (state.dot.settled) |

Under `prefers-reduced-motion`, skip the loop and show the finished state.

## Type

The app uses SF for body text and New York (the system serif) for display headings: 28pt
semibold display, 34pt numerals, 13pt labels and body, 12pt captions, 11pt semibold
section headers. The website deliberately uses **Schibsted Grotesk** for everything,
because it renders the same on every platform. **Pinyon Script** is used only for the
"Roundhand" wordmark. Keep the pill's text sizes (13px) exact.
