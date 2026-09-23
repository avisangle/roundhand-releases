"use client";

import { track } from "@vercel/analytics";
import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DOWNLOAD_URL, VERSION } from "@/lib/site";

type Props = {
  placement: "header" | "hero" | "platforms" | "wispr-alternative";
  size?: "sm" | "lg";
  className?: string;
};

export function DownloadButton({ placement, size = "lg", className }: Props) {
  return (
    <a
      href={DOWNLOAD_URL}
      onClick={() => track("download", { placement, version: VERSION })}
      className={cn(
        buttonVariants({ size: size === "lg" ? "lg" : "sm" }),
        size === "lg" && "h-12 gap-2 rounded-lg px-5 text-base font-semibold",
        size === "sm" && "h-9 rounded-lg px-3.5 text-sm font-semibold",
        "rust-gloss shadow-card hover:brightness-110 hover:shadow-raised",
        className,
      )}
    >
      <Download aria-hidden className={size === "lg" ? "size-[18px]" : "size-4"} />
      {size === "lg" ? `Download for Mac (v${VERSION})` : "Download"}
    </a>
  );
}
