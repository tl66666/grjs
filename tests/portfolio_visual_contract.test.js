const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

assert.match(
  html,
  /\.experience-section\s*\{[^}]*url\("assets\/portfolio\/project-cloud-bg\.jpg"\)[^}]*background-size:\s*cover/s,
  'experience must use a full-bleed visual background',
);
assert.match(
  html,
  /\.awards-section\s*\{[^}]*url\("assets\/portfolio\/explore-bg\.jpg"\)[^}]*background-size:\s*cover/s,
  'awards must use a full-bleed visual background',
);
assert.match(
  html,
  /\.showcase-video video\s*\{[^}]*opacity:\s*1[^}]*object-fit:\s*cover/s,
  'the showcase artwork must remain fully opaque and cover its section',
);
assert.match(
  html,
  /\.agent-proof\s*\{[^}]*background:\s*#f8f6ef/s,
  'Agent proof content needs an opaque light reading surface',
);
assert.match(
  html,
  /\.role-fit\s*\{[^}]*background:\s*#f8f6ef/s,
  'role-fit content needs an opaque light reading surface',
);
assert.match(
  html,
  /\.project-slide-heshengxu \.project-slide-gallery-item:not\(\.portrait\)\s*\{[^}]*border:\s*0[^}]*box-shadow:\s*none/s,
  'Heshengxu runtime images must not have an artificial frame',
);
assert.match(
  html,
  /@media \(max-width:\s*620px\)[\s\S]*?\.nav-pill a:nth-of-type\(3\)[\s\S]*?\.nav-pill a:nth-of-type\(4\)[\s\S]*?\.nav-pill a:nth-of-type\(5\)[\s\S]*?\.nav-pill a:nth-of-type\(7\)[^{]*\{\s*display:\s*none/s,
  'mobile navigation must keep only the three primary destinations visible',
);
assert.match(
  html,
  /@media \(max-width:\s*768px\)[\s\S]*?\.experience-section \.wrap,[\s\S]*?\.awards-section \.wrap\s*\{[^}]*margin-inline:\s*16px/s,
  'mobile experience and award content must keep breathing room inside full-bleed backgrounds',
);
assert.match(
  html,
  /@media \(max-width:\s*768px\)[\s\S]*?\.experience-meta\s*\{[^}]*flex-direction:\s*column/s,
  'mobile experience metadata must stack instead of clipping long organization names',
);

console.log('Portfolio visual contract passed');
