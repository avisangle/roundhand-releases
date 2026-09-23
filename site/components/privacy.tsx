import { MODEL_DOWNLOAD } from "@/lib/site";

const COMMITMENTS = [
  {
    title: "No cloud speech servers",
    body: "Transcription and voice detection run on your Mac's own chip. There is no Roundhand server for your voice to go to.",
  },
  {
    title: "Audio never touches disk",
    body: "Sound is held in memory while you speak and discarded once it's transcribed. There are no recordings to leak or delete.",
  },
  {
    title: "No account, no tracking",
    body: "You don't sign up, and the app doesn't report usage, crashes or anything else back to us.",
  },
  {
    title: "Your key, your provider",
    body: "AI cleanup through a provider is off until you add your own key. When it's on, only the transcribed text is sent to the provider you picked, and they bill you directly.",
  },
  {
    title: "Settings stay on your Mac",
    body: "Your shortcuts, styles and keys are stored on your Mac. Nothing is synced anywhere.",
  },
  {
    title: "Online once, then optional",
    body: `The speech model (${MODEL_DOWNLOAD}) downloads on first launch. After that, dictation works with Wi-Fi switched off.`,
  },
];

export function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-heading" className="scroll-mt-16 bg-deep text-deep-fg">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="privacy-heading" className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            What you say stays on your Mac
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-deep-muted">
            Dictation hears everything: names, numbers, half-formed ideas. That&rsquo;s why
            Roundhand was built to work on your Mac from day one, instead of adding privacy settings later.
          </p>
        </div>

        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {COMMITMENTS.map((item) => (
            <div key={item.title} className="border-t border-deep-rule pt-5">
              <dt className="font-semibold">{item.title}</dt>
              <dd className="mt-2 leading-relaxed text-deep-muted">{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
