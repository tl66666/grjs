const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'C:/Users/唐乐/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.env.PORTFOLIO_URL||'http://127.0.0.1:8765';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  for(const width of [1440,390]) {
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   await page.goto(origin+'/index.html?project=health#projects',{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('#gallerySlides').evaluate(el=>el.scrollTop),0,'Opening details starts with the project title');
   for(const index of [1,7,0,3,5]) {
    await page.locator('#gallerySlides').evaluate(el=>{el.scrollTop=el.scrollHeight;});
    await page.locator(`[data-gallery-project="${index}"]`).click();
    assert.equal(await page.locator('#gallerySlides').evaluate(el=>el.scrollTop),0,`Switch to project ${index} starts at top`);
   }
   await page.locator('#galleryNext').click();
   assert.equal(await page.locator('#gallerySlides').evaluate(el=>el.scrollTop),0,'Next project starts at top');
   await page.locator('#galleryPrev').click();
   assert.equal(await page.locator('#gallerySlides').evaluate(el=>el.scrollTop),0,'Previous project starts at top');
   await page.locator('#gallerySlides').evaluate(el=>{el.scrollTop=el.scrollHeight;});
   await page.locator('[data-gallery-project][aria-pressed="true"]').click();
   assert.equal(await page.locator('#gallerySlides').evaluate(el=>el.scrollTop),0,'Current project tab returns to the top');
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.locator('[data-gallery-project="7"]').click();
   await page.waitForFunction(()=>getComputedStyle(document.querySelector('.project-slide.active')).opacity==='1');
   assert.equal(await page.locator('#gallerySlides').evaluate(el=>el.scrollTop),0,'Entry animation preserves the starting position');
   assert.equal(await page.evaluate(()=>[...document.querySelectorAll('main video')].every(video=>video.paused)),true,'Background videos pause while details are open');
   await page.close();
  }
  console.log('Project open, tab switches, previous and next always start at the top on desktop and mobile.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
