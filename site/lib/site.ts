// Single source of truth for release facts. Update these when shipping a new build;
// they must match appcast.xml at the repository root.

export const VERSION = "0.2.0";

// Canonical origin, with no trailing slash. Used for metadata, robots, the sitemap and JSON-LD.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roundhand.vercel.app";

// Stable GitHub release URL. Do not paste the signed release-assets.githubusercontent.com
// link from the browser's download history: it carries an expiry (`se=`) and stops
// working about an hour after it was issued.
export const DOWNLOAD_URL = `https://github.com/avisangle/roundhand-releases/releases/download/v${VERSION}/Roundhand-${VERSION}.dmg`;

export const RELEASES_URL = "https://github.com/avisangle/roundhand-releases/releases";
export const RELEASE_NOTES_URL = `${RELEASES_URL}/tag/v${VERSION}`;
export const GITHUB_URL = "https://github.com/avisangle";

export const REQUIREMENTS = "Apple Silicon Mac, macOS 14 Sonoma or later";
export const MODEL_DOWNLOAD = "about 470 MB";
