# Roundhand — downloads and update feed

Public distribution for [Roundhand](https://github.com/avisangle/roundhand), a macOS
menu-bar dictation app. **The application source is not in this repository.**

- **Download:** [latest release](https://github.com/avisangle/roundhand-releases/releases/latest)
- **Update feed:** `https://avisangle.github.io/roundhand-releases/appcast.xml`

Requires **Apple Silicon** and macOS 14 or later. Intel Macs are not supported.

## What lives here

| File | Purpose |
|---|---|
| `appcast.xml` | Sparkle update feed. Regenerated and EdDSA-signed by the release pipeline; never edit by hand except to withdraw a release |
| `index.html` | Download page served by GitHub Pages |

Releases and their `.dmg` assets are published here rather than on the source
repository, which is private — GitHub serves release assets on a private
repository only to authenticated users, so neither Sparkle nor a browser could
fetch them.
