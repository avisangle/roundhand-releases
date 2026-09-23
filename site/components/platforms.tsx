import { DownloadButton } from "@/components/download-button";
import { WaitlistForm } from "@/components/waitlist-form";
import { MODEL_DOWNLOAD, RELEASE_NOTES_URL, REQUIREMENTS } from "@/lib/site";

export function Platforms() {
  return (
    <section id="windows" aria-labelledby="platforms-heading" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 id="platforms-heading" className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Get Roundhand
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl bg-card p-6 shadow-card sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">macOS</h3>
              <span className="rounded-full bg-window px-2.5 py-1 text-sm font-medium text-foreground">
                Available now
              </span>
            </div>
            <ul className="mt-5 space-y-2 leading-relaxed text-muted-foreground">
              <li>{REQUIREMENTS}. Intel Macs aren&rsquo;t supported.</li>
              <li>Speech model downloads on first launch ({MODEL_DOWNLOAD}).</li>
              <li>Updates are offered in-app, and nothing installs without your OK.</li>
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
              <DownloadButton placement="platforms" />
              <a href={RELEASE_NOTES_URL} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                What&rsquo;s new in this release
              </a>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-dashed border-guide p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">Windows</h3>
              <span className="rounded-full border border-border px-2.5 py-1 text-sm font-medium text-muted-foreground">
                In development
              </span>
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              The same on-device transcription and privacy guarantees, built for Windows. Leave
              your email and we&rsquo;ll tell you when it&rsquo;s ready.
            </p>
            <div className="mt-auto pt-8">
              <WaitlistForm />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
