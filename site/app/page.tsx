import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Platforms } from "@/components/platforms";
import { Privacy } from "@/components/privacy";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustStrip } from "@/components/trust-strip";

export default function Home() {
  return (
    <>
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
