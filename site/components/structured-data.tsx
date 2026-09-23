import { FAQS } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { APP_ICON } from "@/lib/brand";
import { DOWNLOAD_URL, GITHUB_URL, RELEASE_NOTES_URL, SITE_URL, VERSION } from "@/lib/site";

// schema.org JSON-LD for search and AI engines. Built from lib/site.ts and the FAQ list,
// so it stays in step with the visible page on every release.
const GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Roundhand",
      url: SITE_URL,
      logo: `${SITE_URL}${APP_ICON[512]}`,
      sameAs: [GITHUB_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Roundhand",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Roundhand",
      description:
        "Private dictation for Mac. Hold a shortcut, speak, and clean text appears in whatever app you're using. Transcription runs on your Mac; audio is never uploaded or saved.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS 14 Sonoma or later (Apple Silicon)",
      softwareVersion: VERSION,
      downloadUrl: DOWNLOAD_URL,
      releaseNotes: RELEASE_NOTES_URL,
      image: `${SITE_URL}${APP_ICON[1024]}`,
      url: SITE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export function StructuredData() {
  return <JsonLd data={GRAPH} />;
}
