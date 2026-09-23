import { DictationDemo } from "@/components/dictation-demo";
import { DownloadButton } from "@/components/download-button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl">
            Speak naturally. Type anywhere on your Mac.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
            Hold a shortcut, say what you mean, and Roundhand writes it into whatever app
            you&rsquo;re in, cleaned up and punctuated. Your voice is transcribed on your Mac
            and never sent to a cloud speech server.
          </p>

          <div className="mt-9 flex flex-col items-start gap-3">
            <DownloadButton placement="hero" />
            <p className="text-sm text-muted-foreground">Free for Apple Silicon Macs on macOS 14 or later.</p>
          </div>

          <a
            href="#windows"
            className="mt-8 inline-block text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            On Windows? Join the waitlist for the Windows version.
          </a>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="copybook absolute -inset-x-10 -inset-y-12 opacity-80 [mask-image:radial-gradient(closest-side,black_55%,transparent)]"
          />
          <div className="relative">
            <DictationDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
