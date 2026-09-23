import type { Metadata } from "next";
import { DownloadButton } from "@/components/download-button";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APP_ICON } from "@/lib/brand";
import { MODEL_DOWNLOAD, REQUIREMENTS, SITE_URL } from "@/lib/site";
import { CHECKED_ON, CHECKED_ON_ISO, SOURCES, WISPR } from "@/lib/wispr";

const PATH = "/wispr-flow-alternative";
const TITLE = "A free, offline Wispr Flow alternative for Mac | Roundhand";
const DESCRIPTION =
  "Roundhand works like Wispr Flow (hold a shortcut, speak, clean text in any app) but transcribes on your Mac. Free, offline, no account, no weekly word cap.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PATH,
    images: [{ url: APP_ICON[1024], width: 1024, height: 1024, alt: "Roundhand app icon" }],
  },
};

// Roundhand's column comes from what the homepage already promises; Wispr's from lib/wispr.ts.
const ROWS: { label: string; roundhand: string; wispr: string }[] = [
  {
    label: "Where your voice is transcribed",
    roundhand: "On your Mac",
    wispr: "On Wispr's cloud servers",
  },
  {
    label: "Works offline",
    roundhand: `Yes, after a one-time model download (${MODEL_DOWNLOAD})`,
    wispr: "No, transcription needs a connection",
  },
  {
    label: "Audio recordings",
    roundhand: "Kept in memory only, never saved",
    wispr: "Sent to the cloud; cloud storage of audio and history is a setting",
  },
  { label: "Account", roundhand: "None", wispr: "Required" },
  {
    label: "Price",
    roundhand: "Free",
    wispr: `Free plan, or a paid Pro subscription priced by country`,
  },
  {
    label: "Word limit",
    roundhand: "None",
    wispr: `${WISPR.freeWordsPerWeek} words a week on the free desktop plan`,
  },
  { label: "Works in any app", roundhand: "Yes", wispr: "Yes" },
  {
    label: "Text cleanup",
    roundhand: "Filler words and punctuation fixed on your Mac; optional rewrites with your own OpenAI or Claude key",
    wispr: "AI cleanup in the cloud",
  },
  {
    label: "Platforms",
    roundhand: "Mac (Apple Silicon); Windows in development",
    wispr: WISPR.platforms,
  },
];

const REASONS = [
  {
    title: "Your voice stays on your Mac",
    body: "Wispr Flow sends your audio to its servers to turn it into text. Roundhand does that work on your Mac's own chip, so there's nothing to upload, store or leak.",
  },
  {
    title: "No word allowance to watch",
    body: `Wispr Flow's free plan stops at ${WISPR.freeWordsPerWeek} words a week on desktop. Roundhand is free with no cap, so a long email doesn't cost you part of your week.`,
  },
  {
    title: "Nothing to sign up for",
    body: "Download, allow Microphone and Accessibility access, and start talking. There's no account, no trial clock and no usage reporting.",
  },
  {
    title: "Works on a plane",
    body: "Once the speech model has downloaded, dictation works with Wi-Fi switched off. A cloud dictation app can't do that.",
  },
];

const WISPR_WINS = [
  `You need dictation on Windows, iPhone or Android today. Wispr Flow runs on ${WISPR.platforms}; Roundhand is Mac-only for now.`,
  `You dictate in many languages. Wispr Flow lists support for ${WISPR.languages} languages.`,
  "You want your dictation history synced across devices, which needs a cloud service.",
  "Your company needs team billing, admin controls or vendor compliance paperwork from a dictation provider.",
];

const STEPS = [
  "Download Roundhand and drag it to your Applications folder.",
  "Open it and allow Microphone and Accessibility access when macOS asks. Roundhand needs them to hear you and to type into other apps.",
  `Let the speech model download once (${MODEL_DOWNLOAD}).`,
  "Hold your shortcut in any app and speak, the same way you did with Wispr Flow.",
];

const FAQS = [
  {
    q: "Does Wispr Flow work offline?",
    a: "No. According to Wispr's own security documentation, Wispr Flow processes dictated audio in the cloud, so transcription needs an internet connection. Roundhand transcribes on your Mac and works fully offline after its speech model downloads.",
  },
  {
    q: "Is Wispr Flow free?",
    a: `Wispr Flow has a free plan limited to ${WISPR.freeWordsPerWeek} words a week on desktop, and a paid Pro plan for unlimited dictation. Pro is priced by country, so check Wispr's pricing page for yours. Roundhand is free with no word limit.`,
  },
  {
    q: "What is the best free Wispr Flow alternative for Mac?",
    a: "If privacy matters to you, Roundhand: a free Mac dictation app that works in any app like Wispr Flow, but transcribes on your Mac, works offline, needs no account and has no weekly word cap.",
  },
  {
    q: "Is there a private Wispr Flow alternative that doesn't upload audio?",
    a: "Yes. Roundhand never uploads your audio. It's held in memory while you speak and discarded once transcribed. If you turn on optional AI rewrites with your own API key, only the transcribed text goes to the provider you chose.",
  },
  {
    q: "Is Roundhand available for Windows?",
    a: "Not yet. The Windows version is in development. Join the waitlist on the homepage and we'll send you one email when it's ready.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${PATH}#webpage`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      dateModified: CHECKED_ON_ISO,
      about: { "@id": `${SITE_URL}/#app` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Roundhand", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Wispr Flow alternative", item: `${SITE_URL}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function WisprFlowAlternative() {
  return (
    <>
      <JsonLd data={JSON_LD} />
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 md:pt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-rust-text">Wispr Flow alternative</p>
            <h1 className="mt-3 text-[2.4rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              A free, offline Wispr Flow alternative for Mac
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
              Roundhand is a free dictation app for Apple Silicon Macs that works the way Wispr
              Flow does: hold a shortcut, speak, and clean, punctuated text appears in whatever
              app you&rsquo;re using. The difference is where your voice goes. Roundhand
              transcribes on your Mac, works offline, needs no account and has no weekly word cap.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3">
              <DownloadButton placement="wispr-alternative" />
              <p className="text-sm text-muted-foreground">Free. Requires an {REQUIREMENTS}.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="compare-heading" className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
            <h2 id="compare-heading" className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
              Roundhand vs Wispr Flow
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Wispr Flow details checked against Wispr&rsquo;s own site on{" "}
              <time dateTime={CHECKED_ON_ISO}>{CHECKED_ON}</time>. Sources are listed at the
              bottom of this page.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl bg-background shadow-card">
              <table className="w-full table-fixed text-left text-sm sm:text-[15px]">
                <caption className="sr-only">Comparison of Roundhand and Wispr Flow</caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="w-[30%] px-3 py-4 font-medium text-muted-foreground sm:px-5">
                      <span className="sr-only">Feature</span>
                    </th>
                    <th scope="col" className="px-3 py-4 font-semibold sm:px-5">Roundhand</th>
                    <th scope="col" className="px-3 py-4 font-semibold sm:px-5">Wispr Flow</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-border last:border-b-0">
                      <th scope="row" className="px-3 py-4 align-top font-medium hyphens-auto sm:px-5">
                        {row.label}
                      </th>
                      <td className="px-3 py-4 align-top leading-relaxed break-words sm:px-5">{row.roundhand}</td>
                      <td className="px-3 py-4 align-top leading-relaxed break-words text-muted-foreground sm:px-5">{row.wispr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section aria-labelledby="why-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 id="why-heading" className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            Why people switch from Wispr Flow to Roundhand
          </h2>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {REASONS.map((item) => (
              <div key={item.title} className="border-t border-border pt-6">
                <h3 className="text-xl font-semibold tracking-[-0.015em]">{item.title}</h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="wispr-wins-heading" className="border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 id="wispr-wins-heading" className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
              When Wispr Flow is the better choice
            </h2>
            <ul className="space-y-4 leading-relaxed text-muted-foreground">
              {WISPR_WINS.map((line) => (
                <li key={line} className="border-t border-border pt-4">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="switch-heading" className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
            <h2 id="switch-heading" className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
              How to switch from Wispr Flow
            </h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
              {STEPS.map((step, i) => (
                <li key={step}>
                  <span className="flex size-10 items-center justify-center rounded-full border-2 border-primary text-base font-semibold text-rust-text tabular-nums">
                    {i + 1}
                  </span>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="alt-faq-heading" className="border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 id="alt-faq-heading" className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
              Wispr Flow alternative: common questions
            </h2>
            {/* Answers are always visible here, so they read as direct answers to crawlers too. */}
            <dl className="border-t border-border">
              {FAQS.map((item) => (
                <div key={item.q} className="border-b border-border py-6">
                  <dt className="text-base font-semibold">{item.q}</dt>
                  <dd className="mt-2 max-w-[62ch] leading-relaxed text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-label="Sources" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground sm:px-6">
            <p>
              Sources for Wispr Flow details (checked <time dateTime={CHECKED_ON_ISO}>{CHECKED_ON}</time>):
            </p>
            <ul className="mt-2 space-y-1">
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="nofollow noopener" className="underline underline-offset-4 hover:text-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Wispr Flow is a trademark of Wispr AI. Roundhand isn&rsquo;t affiliated with or endorsed
              by Wispr AI.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
