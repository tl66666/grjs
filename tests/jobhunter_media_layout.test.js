const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

assert.match(
  html,
  /name:\s*['"]职途 AI Agent['"][\s\S]*?career-hero-loop\.mp4[\s\S]*?agent-local-desktop\.webp[\s\S]*?interview\.png/s,
  "JobHunter must keep its motion hero and both real product views in the gallery data",
);
assert.match(
  html,
  /\.project-slide-body\s*\{[^}]*grid-template-columns:\s*0\.85fr\s+1\.15fr[^}]*align-items:\s*start/s,
  "desktop project slides must balance the explanation and product gallery without a dead quadrant",
);
assert.match(
  html,
  /\.project-slide-gallery\s*\{[^}]*flex-direction:\s*column[^}]*position:\s*sticky/s,
  "project screenshots must stay grouped beside the project explanation",
);
assert.match(
  html,
  /@media \(max-width:\s*768px\)[\s\S]*?\.project-slide-body\s*\{\s*grid-template-columns:\s*1fr/s,
  "mobile project slides must stack content and media in one readable column",
);

console.log("JobHunter portfolio media layout contract passed");
