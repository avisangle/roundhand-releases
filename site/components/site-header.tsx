import Link from "next/link";
import { AppIcon } from "@/components/app-icon";
import { DownloadButton } from "@/components/download-button";

// Absolute ("/#…") so the links also work from subpages.
const NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#windows", label: "Windows" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-script text-[1.9rem] leading-none text-foreground">
          <AppIcon size={34} preload />
          Roundhand
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <DownloadButton placement="header" size="sm" />
      </div>
    </header>
  );
}
