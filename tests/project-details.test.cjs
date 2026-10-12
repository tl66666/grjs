const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/唐乐/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin = process.env.PORTFOLIO_URL || 'http://127.0.0.1:8765';
(async () => {
  const readme = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
  assert.ok(!readme.includes('![灯影古镇'));
  assert.ok(!readme.includes('## 互动作品：灯影古镇'));
  const browser = await chromium.launch({ headless:true, channel:'msedge' });
  try {
    const page = await browser.newPage({ viewport:{width:1440,height:1000}, reducedMotion:'reduce' });
    const errors=[]; page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`${origin}/project-lantern.html`, {waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#maps figure').count(),4);
    assert.equal(await page.locator('#cards figure').count(),4);
    const media=await page.locator('img[src]').evaluateAll(images=>images.map(img=>img.getAttribute('src')));
    for(const src of media) assert.equal((await page.request.get(`${origin}/${src}`)).status(),200,src);
    for (const img of await page.locator('#cards img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(img => img.decode());
    }
    await page.evaluate(()=>scrollTo(0, document.querySelector('#cards').offsetTop - 75));
    await page.screenshot({path:'output/review/game-cards-desktop.png'});
    await page.locator('#cards a').first().click();
    assert.equal(await page.locator('#detailViewer').evaluate(dialog=>dialog.open),true);
    await page.keyboard.press('Escape');
    await page.waitForFunction(()=>!document.getElementById('detailViewer').open);
    assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-full-image')),true);
    await page.goto(`${origin}/project-heshengxu.html`,{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#runtime figure').count(),6);
    assert.match(await page.locator('#platforms').innerText(),/微信小程序/);
    assert.match(await page.locator('#platforms').innerText(),/Android App/);
    assert.match(await page.locator('#platforms a').first().getAttribute('href'),/\.apk$/);
    await page.locator('#platforms').scrollIntoViewIfNeeded();
    await page.screenshot({path:'output/review/health-platforms-desktop.png'});
    for(const url of ['project-lantern.html','project-heshengxu.html']) {
      await page.setViewportSize({width:390,height:844});
      await page.goto(`${origin}/${url}`,{waitUntil:'domcontentloaded'});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,url);
      await page.screenshot({path:`output/review/${url.replace('.html','')}-mobile.png`});
    }
    const offline=await browser.newPage({javaScriptEnabled:false});
    await offline.goto(`${origin}/project-lantern.html`);
    assert.equal(await offline.locator('[data-full-image]').count(),8);
    assert.deepEqual(errors,[]);
    console.log('Project details passed: balanced README, 4 maps, 4 character cards, 6 health screenshots, dual platforms, lightbox, mobile and no-JS.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
