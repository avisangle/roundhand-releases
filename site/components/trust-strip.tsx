import { AppWindow, Cpu, HardDriveDownload, MicOff } from "lucide-react";

const FACTS = [
  { icon: Cpu, title: "100% on-device transcription", detail: "Speech recognition and voice detection run locally." },
  { icon: AppWindow, title: "Works in any app", detail: "Anywhere you can place a text cursor." },
  { icon: MicOff, title: "Zero audio stored", detail: "Recordings are never written to disk." },
  { icon: HardDriveDownload, title: "15 MB download", detail: "A native Swift menu-bar app." },
];

export function TrustStrip() {
  return (
    <section aria-label="At a glance" className="border-y border-border bg-card">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border px-4 sm:grid-cols-2 sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:divide-x">
        {FACTS.map(({ icon: Icon, title, detail }) => (
          <li key={title} className="flex gap-3 py-5 sm:py-6 lg:px-6 lg:first:pl-0 lg:last:pr-0">
            <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} />
            <div>
              <p className="leading-snug font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
