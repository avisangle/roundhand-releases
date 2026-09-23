import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Platforms } from "@/components/platforms";
import { Privacy } from "@/components/privacy";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { TrustStrip } from "@/components/trust-strip";

// Each page sets its own canonical; a layout-level one would be inherited by subpages.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Privacy />
        <Platforms />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
