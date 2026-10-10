const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/唐乐/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin = process.env.PORTFOLIO_URL || 'http://127.0.0.1:8765';
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(origin, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('.work-card').count(), 7, 'Seven projects must be readable without opening the gallery');
    await page.locator('[data-filter="frontend"]').click();
    assert.equal(await page.locator('.work-card:visible').count(), 1, 'Frontend collaboration filter selects ZhiTu');
    const opener = page.locator('.work-card:visible [data-open-project]');
    await opener.click();
    await page.waitForFunction(() => document.querySelector('#projectGallery').classList.contains('active'));
    assert.match(await page.locator('.project-slide.active .project-slide-title').innerText(), /ZhiTu/);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'galleryExit');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'galleryNext', 'Focus stays inside gallery');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#projectGallery').classList.contains('active'));
    assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-open-project')), true, 'Close restores original focus');
    assert.equal(await page.evaluate(() => [...document.querySelectorAll('video')].every(v => v.paused)), true, 'Reduced motion pauses all videos');
    await page.locator('[data-filter="all"]').click();
    for (const width of [320, 768, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `No overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => scrollTo(0, 0));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Mobile page must not overflow');
    await page.screenshot({ path: path.join(__dirname, '../output/review/mobile-home.png') });
    await page.evaluate(() => scrollTo(0, document.querySelector('#selected-work').offsetTop - 65));
    await page.screenshot({ path: path.join(__dirname, '../output/review/mobile-work.png') });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: path.join(__dirname, '../output/review/desktop-home.png') });
    await page.evaluate(() => scrollTo(0, document.querySelector('#selected-work').offsetTop - 65));
    await page.screenshot({ path: path.join(__dirname, '../output/review/desktop-work.png') });
    const offline = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await offline.goto(origin, { waitUntil: 'domcontentloaded' });
    assert.equal(await offline.locator('.work-card a.work-source').count(), 7, 'Source links survive without JavaScript');
    assert.equal(await offline.locator('.work-card:visible').count(), 7);
    assert.equal(await offline.locator('.hero-card').isVisible(), true);
    const standard = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await standard.route('https://d8j0ntlcm91z4.cloudfront.net/**', route => route.abort());
    await standard.goto(origin, { waitUntil: 'domcontentloaded' });
    await standard.locator('#motionControl').click();
    assert.equal(await standard.locator('#motionControl').getAttribute('aria-pressed'), 'true');
    assert.equal(await standard.evaluate(() => [...document.querySelectorAll('video')].every(v => v.paused)), true);
    await standard.reload({ waitUntil: 'domcontentloaded' });
    assert.equal(await standard.locator('#motionControl').getAttribute('aria-pressed'), 'true', 'Motion preference persists');
    const assets = await standard.evaluate(() => [...new Set([
      ...[...document.querySelectorAll('img, video')].map(el => el.getAttribute('src') || el.getAttribute('poster')),
      ...PROJECT_DATA.flatMap(project => project.media.filter(media => media.type === 'image').map(media => media.src))
    ])].filter(src => src && !src.startsWith('http')));
    for (const asset of assets) assert.equal((await standard.request.get(new URL(asset, origin).href)).status(), 200, `Asset exists: ${asset}`);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => scrollTo(0, document.querySelector('#work-agent').offsetTop - 75));
    await page.locator('#work-agent [data-open-project]').click();
    await page.waitForFunction(() => document.querySelector('#projectGallery').classList.contains('active'));
    assert.equal(await page.locator('#galleryCounter').textContent(), '03 / 07');
    await page.locator('#galleryNext').click();
    assert.match(await page.locator('.project-slide.active .project-slide-title').innerText(), /DreamChord/);
    assert.equal(await page.locator('[data-gallery-project]').count(), 7);
    await page.locator('[data-gallery-project="1"]').click();
    assert.match(await page.locator('.project-slide.active .project-slide-title').innerText(), /ZhiTu/);
    const screenshot = page.locator('.project-slide.active [data-preview-src]').first();
    await screenshot.click();
    assert.equal(await page.locator('#mediaPreview').evaluate(dialog => dialog.open), true);
    assert.match(await page.locator('#mediaPreviewImage').getAttribute('alt'), /ZhiTu/);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.getElementById('mediaPreview').open);
    assert.equal(await page.locator('#projectGallery').evaluate(gallery => gallery.classList.contains('active')), true, 'Escape closes screenshot without closing the project');
    assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-preview-src')), true);
    await page.screenshot({ path: path.join(__dirname, '../output/review/mobile-gallery.png') });
    await page.locator('#galleryExit').click();
    assert.deepEqual(errors, [], 'No browser script errors');
    console.log('Recruiter flow passed: 7 projects, filtering, direct gallery, focus, Escape, reduced motion, mobile, no-JS.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
