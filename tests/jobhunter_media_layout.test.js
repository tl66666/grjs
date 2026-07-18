const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

assert.match(
  html,
  /\.project-card:first-child \.media-grid\s*\{[^}]*height:\s*clamp\(500px,\s*40vw,\s*680px\)/s,
  "JobHunter media must keep a stable desktop height instead of stretching with the text column",
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
