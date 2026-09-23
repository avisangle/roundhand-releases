const STEPS = [
  {
    title: "Hold your shortcut and speak",
    body: "Press and hold the global shortcut from any app. A small pill at the bottom of your screen shows what it hears. Talk the way you normally would.",
  },
  {
    title: "Roundhand transcribes on your Mac",
    body: "When you let go, speech recognition on your Mac turns your words into text and tidies them up. Nothing is uploaded.",
  },
  {
    title: "The text lands where your cursor is",
    body: "Finished text is inserted straight into the app you were using: Slack, Mail, Word, Notes, your browser or your editor.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 id="how-heading" className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Three steps, no window to switch to
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <div className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary text-base font-semibold text-rust-text tabular-nums">
                  {i + 1}
                </span>
                {i < STEPS.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-border md:block" />}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
