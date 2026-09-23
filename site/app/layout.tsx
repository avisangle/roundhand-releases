import type { Metadata, Viewport } from "next";
import { Pinyon_Script, Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { APP_ICON } from "@/lib/brand";
import { BROWSER_CHROME } from "@/lib/tokens";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

// Used only for the wordmark: roundhand is the script the app is named after.
const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://roundhand.vercel.app"),
  title: "Roundhand: private dictation for your Mac",
  description:
    "Hold a shortcut, speak, and clean text appears in whatever app you're using. Transcription runs on your Mac; audio is never uploaded or saved.",
  openGraph: {
    title: "Roundhand: private dictation for your Mac",
    description:
      "Speak naturally and type anywhere on your Mac. On-device transcription, no accounts, no telemetry.",
    type: "website",
    images: [{ url: APP_ICON[1024], width: 1024, height: 1024, alt: "Roundhand app icon" }],
  },
  // The share image is the square app icon, so use the square card.
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: BROWSER_CHROME,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${schibsted.variable} ${pinyon.variable}`}>
      <body className="min-h-dvh">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
