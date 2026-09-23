import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MODEL_DOWNLOAD } from "@/lib/site";

const FAQS = [
  {
    q: "Do I need an internet connection?",
    a: `Only once. On first launch Roundhand downloads its speech model (${MODEL_DOWNLOAD}). After that, dictation works fully offline. Optional AI cleanup through a provider needs a connection to that provider.`,
  },
  {
    q: "Is my voice data kept private?",
    a: "Yes. Audio is transcribed on your Mac, kept only in memory while you speak, and never uploaded or saved to disk. There are no accounts and no telemetry.",
  },
  {
    q: "Which apps does Roundhand work in?",
    a: "Any app where you can place a text cursor: Slack, Mail, Messages, Word, Pages, Notes, browsers and code editors. On first run macOS asks you to allow Microphone and Accessibility access, which Roundhand needs to hear you and insert text.",
  },
  {
    q: "What is BYOK AI cleanup?",
    a: "Bring your own key. Paste an API key from a provider such as OpenAI or Anthropic and Roundhand can rewrite transcripts with presets you define, like more formal, shorter or bullet points. Only the transcript text is sent, and the provider bills you directly.",
  },
  {
    q: "When is the Windows version launching?",
    a: "It's in active development and there's no date yet. Join the waitlist and we'll send you one email when it's ready to download.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 id="faq-heading" className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Questions
        </h2>
        <Accordion className="border-t border-border">
          {FAQS.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-b border-border">
              <AccordionTrigger className="rounded-none py-5 text-base font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                <p className="max-w-[62ch]">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
