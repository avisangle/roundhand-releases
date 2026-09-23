import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CHECKED_ON_ISO } from "@/lib/wispr";

// The homepage's lastModified is the build time: Vercel only rebuilds when site/ changes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/wispr-flow-alternative`,
      lastModified: new Date(CHECKED_ON_ISO),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
