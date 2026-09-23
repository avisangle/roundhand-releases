// Builds the browser icons in app/ from the app icon in public/brand/.
// Run `npm run icons` after replacing the files in public/brand/ (copy them from the
// macOS app's AppIcon.appiconset). The outputs are committed; Vercel doesn't run this.
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const brand = (px) => `public/brand/roundhand-icon-${px}.png`;

// The page ground (--panel), read from globals.css so no colour is repeated here.
const panel = readFileSync("app/globals.css", "utf8").match(/--panel:\s*([^;]+);/)[1].trim();

// app/icon.png: the tab icon for modern browsers. Next adds the <link> tag.
await sharp(brand(512)).toFile("app/icon.png");

// app/apple-icon.png: 180x180 for the iOS home screen. iOS fills transparency with
// black and rounds the corners itself, so trim the macOS padding and put the icon on
// the page ground.
await sharp(brand(1024))
  .trim()
  .resize(180, 180, { fit: "contain", background: panel })
  .flatten({ background: panel })
  .toFile("app/apple-icon.png");

// app/favicon.ico: 16, 32 and 48 px, for browsers and crawlers that only ask for
// /favicon.ico. Each entry is a PNG, which every current browser reads.
const images = [
  readFileSync(brand(16)),
  readFileSync(brand(32)),
  await sharp(brand(256)).resize(48, 48).png().toBuffer(),
];
const sizes = [16, 32, 48];
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((png, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(sizes[i], entry); // width
  header.writeUInt8(sizes[i], entry + 1); // height
  header.writeUInt16LE(1, entry + 4); // colour planes
  header.writeUInt16LE(32, entry + 6); // bits per pixel
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
writeFileSync("app/favicon.ico", Buffer.concat([header, ...images]));

console.log("Wrote app/icon.png, app/apple-icon.png and app/favicon.ico.");
