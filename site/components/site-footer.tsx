import { GITHUB_URL, RELEASE_NOTES_URL, RELEASES_URL, VERSION } from "@/lib/site";

const LINKS = [
  { href: RELEASE_NOTES_URL, label: `Release notes (v${VERSION})` },
  { href: RELEASES_URL, label: "All releases" },
  { href: "#privacy", label: "Privacy" },
  { href: GITHUB_URL, label: "GitHub" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-script text-4xl leading-none">Roundhand</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Private dictation for macOS. This website counts visits with cookie-free Vercel
            Analytics; the app itself collects nothing.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground md:text-right">
            &copy; {new Date().getFullYear()} Roundhand
          </p>
        </nav>
      </div>
    </footer>
  );
}
