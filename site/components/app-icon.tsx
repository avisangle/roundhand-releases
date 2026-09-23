import Image from "next/image";
import { APP_ICON } from "@/lib/brand";

// The app icon at any display size. Next resizes the 1024px source for the screen,
// so pass the size it should appear at in CSS pixels. Like every macOS icon it has
// transparent padding, so the rounded square looks about 80% of `size`.
//
// It's decorative by default, because it usually sits next to the name "Roundhand".
// Pass `alt` when the icon stands alone. Pass `preload` above the fold.
export function AppIcon({
  size,
  alt = "",
  className,
  preload,
}: {
  size: number;
  alt?: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={APP_ICON[1024]}
      alt={alt}
      width={size}
      height={size}
      className={className}
      preload={preload}
    />
  );
}
