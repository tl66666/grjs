const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'C:/Users/唐乐/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.env.PORTFOLIO_URL||'http://127.0.0.1:8765';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  for(const width of [1366,390]) {
   const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',error=>errors.push(error.message));
   await page.goto(origin,{waitUntil:'domcontentloaded'});
   for(const [id,name] of [['health','和生序'],['city','城会玩'],['planet','星途']]) {
    const opener=page.locator(`#work-${id} .work-qr`);
    await opener.click();
    const dialog=page.locator('#mediaPreview');
    assert.equal(await dialog.evaluate(el=>el.open),true);
    assert.equal(await dialog.evaluate(el=>el.classList.contains('is-qr')),true);
    assert.match(await page.locator('#mediaPreviewTitle').innerText(),new RegExp(name));
    await page.locator('#mediaPreviewImage').evaluate(img=>img.decode());
    assert.match(await page.locator('#mediaPreviewHint').innerText(),/微信/);
    assert.equal(await page.locator('#mediaPreviewSave').getAttribute('href'),await opener.getAttribute('href'));
    assert.match(await page.locator('#mediaPreviewSave').getAttribute('download'),new RegExp(name));
    const fit=await dialog.evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight;});
    assert.ok(fit,'QR dialog fits the viewport');
    if(id==='health') await page.screenshot({path:`output/review/qr-preview-${width}.png`});
    await page.keyboard.press('Escape');
    await page.waitForFunction(()=>!document.getElementById('mediaPreview').open);
    assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('work-qr')),true);
   }
   await page.locator('#work-health [data-open-project]').click();
   await page.locator('#galleryScan').click();
   assert.equal(await page.locator('#mediaPreview').evaluate(el=>el.open),true);
   await page.locator('#mediaPreviewClose').click();
   assert.equal(await page.locator('#projectGallery').evaluate(el=>el.classList.contains('active')),true);
   await page.locator('.project-slide.active .project-slide-qr').click();
   assert.equal(await page.locator('#mediaPreview').evaluate(el=>el.open),true);
   await page.keyboard.press('Escape');
   await page.locator('[data-gallery-project="7"]').click();
   assert.equal(await page.locator('#galleryScan').isVisible(),false,'Game does not show a mini-program code');
   assert.deepEqual(errors,[]);
   await page.close();
  }
  console.log('Three mini-program codes open enlarged, keep labels and save links, fit mobile / desktop and restore focus.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
