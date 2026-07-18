const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

assert.match(
  html,
  /\.project-card:first-child\s*\{[^}]*grid-template-columns:\s*1fr/s,
  "JobHunter must use a single-column feature layout so the media does not leave a lower-right blank area",
);
assert.match(
  html,
  /\.project-card:first-child \.media-grid\s*\{[^}]*height:\s*clamp\(740px,\s*62vw,\s*960px\)[^}]*margin-top:\s*clamp\(22px,\s*3vw,\s*34px\)/s,
  "JobHunter media must become a full-width storyboard below the project explanation",
);
assert.match(
  html,
  /\.project-card:first-child \.agent-screenshot-tile img\s*\{[^}]*object-fit:\s*contain/s,
  "the primary Agent screenshot must remain fully visible",
);
assert.match(
  html,
  /\.project-card:first-child \.overview-screenshot-tile img\s*\{[^}]*transform:\s*scale\(1\.14\)/s,
  "the secondary screenshot must hide browser chrome without replacing the real product view",
);

console.log("JobHunter portfolio media layout contract passed");
