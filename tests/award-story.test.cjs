const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(index.includes('award-wechat.html'), 'WeChat must have its own detail link');
assert.ok(index.includes('award-trae.html'), 'TRAE must have its own detail link');
assert.ok(!index.includes('awards.html#'), 'Homepage must no longer link to the combined gallery');
for (const activity of ['wechat', 'trae']) {
  const html = fs.readFileSync(path.join(root, `award-${activity}.html`), 'utf8');
  const data = JSON.parse(html.match(/<script id="gallery-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data.slides.length, 5, `${activity}: all five supplied photos must be included`);
  assert.equal(new Set(data.slides.map(slide => slide.src)).size, 5);
  for (const slide of data.slides) {
    assert.ok(fs.existsSync(path.join(root, slide.src)), `Photo exists: ${slide.src}`);
    for (const field of ['title', 'description', 'caption', 'label', 'alt']) assert.ok(slide[field]?.length > 0, `${activity}: ${field} is required`);
  }
  assert.equal((html.match(/role="tab" /g) || []).length, 5, 'Each photo has a keyboard-accessible tab');
  assert.ok(html.includes('<dialog'), 'Full-image viewer uses a modal dialog');
  assert.ok(html.includes('<noscript>'), 'Photos remain available without JavaScript');
}
const css = fs.readFileSync(path.join(root, 'assets/award-story.css'), 'utf8');
const script = fs.readFileSync(path.join(root, 'assets/award-story.js'), 'utf8');
assert.match(css, /object-fit:\s*contain/, 'Photo stage must not crop source images');
assert.match(css, /prefers-reduced-motion/, 'Motion respects accessibility preferences');
assert.match(script, /pointerdown/);
assert.match(script, /pointerup/);
assert.match(script, /ArrowLeft/);
assert.match(script, /ArrowRight/);
new Function(script);
console.log('Award story content and accessibility contracts passed.');