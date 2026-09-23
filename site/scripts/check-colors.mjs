// Fails when a colour is written inline instead of coming from a design token.
// Colour literals belong in app/globals.css (and the one metadata colour in
// lib/tokens.ts); see DESIGN.md. Run with `npm run lint`.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components", "lib"];
const ALLOWED = new Set(["app/globals.css", "lib/tokens.ts"]);
const EXTENSIONS = /\.(tsx?|css|mjs|js)$/;

const PALETTE =
  "white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const UTILITY =
  "bg|text|border|border-[trblxy]|from|via|to|ring|ring-offset|fill|stroke|shadow|outline|decoration|divide|placeholder|caret|accent";

const RULES = [
  { name: "hex colour", pattern: /#[0-9a-f]{3,8}\b(?![-\w])/gi },
  { name: "colour function", pattern: /\b(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb)\(/gi },
  { name: "Tailwind palette colour", pattern: new RegExp(`\\b(?:${UTILITY})-(?:${PALETTE})\\b`, "g") },
  { name: "arbitrary colour value", pattern: new RegExp(`\\b(?:${UTILITY})-\\[(?:#|var\\(|rgb|hsl|oklch)`, "g") },
  { name: "inline style colour", pattern: /\b(?:color|background(?:Color)?|borderColor|fill|stroke)\s*:\s*["'`]/g },
];

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (EXTENSIONS.test(name)) yield path;
  }
}

const problems = [];
for (const root of ROOTS) {
  for (const path of files(root)) {
    const rel = relative(".", path).replaceAll("\\", "/");
    if (ALLOWED.has(rel)) continue;
    readFileSync(path, "utf8")
      .split("\n")
      .forEach((line, i) => {
        for (const { name, pattern } of RULES) {
          for (const match of line.matchAll(pattern)) {
            problems.push(`${rel}:${i + 1}  ${name}: ${match[0]}`);
          }
        }
      });
  }
}

if (problems.length) {
  console.error("Inline colours found. Use a token from app/globals.css (see DESIGN.md):\n");
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("No inline colours.");
