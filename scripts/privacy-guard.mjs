// The osc source is private. Fail if anything that only exists there shows up in what we write or ship.
// Scans authored files (src/, public/) and built pages (dist/*.html). Bundled vendor JS is not scanned.
// Add a pattern whenever something new must never leak.
import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const FORBIDDEN = [
  /\.py\b/i, // module names
  /\bdef \w+\(/, // Python code
  /import osc/i,
  /3933153761/, // Telegram chat id of the owner's group
  /runbook/i, // internal doc names
  /tools\.lock/i,
  /\.typ\b/i,
  /[a-z]:\\projects/i, // local source paths
];
const TEXT = new Set([".astro", ".ts", ".mjs", ".js", ".css", ".md", ".html", ".json", ".txt", ""]);

function* files(dir, only) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "_astro") yield* files(p, only);
    } else if (only ? extname(p) === only : TEXT.has(extname(p))) yield p;
  }
}

let leaks = 0;
for (const file of [...files("src"), ...files("public"), ...files("dist", ".html")]) {
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const re of FORBIDDEN) {
      if (re.test(line)) {
        console.error(`${file}:${i + 1}: matches ${re}`);
        leaks++;
      }
    }
  });
}
if (leaks) {
  console.error(`Privacy guard: ${leaks} match(es). Remove private source details before publishing.`);
  process.exit(1);
}
console.log("Privacy guard: clean.");
