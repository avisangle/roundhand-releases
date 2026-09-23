import { AppWindow, Lock, Sparkles, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Write at the speed you talk",
    body: "Most people speak about three times faster than they type. Draft emails, Slack replies and documents by saying them, then move on.",
  },
  {
    icon: Lock,
    title: "Private by construction",
    body: "Audio is processed on your Mac and discarded once it's transcribed. There's no cloud listening and no data collection to opt out of.",
  },
  {
    icon: Sparkles,
    title: "Cleanup that reads like you",
    body: "Filler words, false starts and missing punctuation are fixed before the text is inserted. Want more? Add your own OpenAI or Claude API key to rewrite text in styles you choose, like more formal or as bullet points.",
  },
  {
    icon: AppWindow,
    title: "Knows where you're typing",
    body: "Roundhand notices the app you're in and matches it: casual in chat, complete sentences in email, tidy lists in notes, exact names in your code editor.",
  },
];

export function Features() {
  return (
    <section aria-labelledby="features-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="max-w-2xl">
        <h2 id="features-heading" className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Built for the writing you do every day
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Messages, emails, notes, tickets, essays. If it has a text box, you can speak into it.
        </p>
      </div>

      <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="border-t border-border pt-6">
            <Icon aria-hidden className="size-6 text-primary" strokeWidth={1.75} />
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em]">{title}</h3>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
