// The Roundhand app icon, as copied from the macOS app into public/brand/. Refer to
// these paths (or use <AppIcon>) rather than writing an icon path or inlining an image.
export const APP_ICON = {
  16: "/brand/roundhand-icon-16.png",
  32: "/brand/roundhand-icon-32.png",
  256: "/brand/roundhand-icon-256.png",
  512: "/brand/roundhand-icon-512.png",
  1024: "/brand/roundhand-icon-1024.png",
} as const;

export type AppIconSize = keyof typeof APP_ICON;
