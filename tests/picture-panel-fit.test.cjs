const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'C:/Users/唐乐/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.env.PORTFOLIO_URL||'http://127.0.0.1:8765';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  for(const [width,height] of [[1366,768],[1440,900],[1695,940],[1024,768],[390,844]]) {
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
   await page.goto(origin+'/index.html?project=health#projects',{waitUntil:'domcontentloaded'});
   const story=page.locator('.project-slide.active .picture-story');
   await page.waitForFunction(()=>document.querySelector('.project-slide.active .picture-story')?.dataset.pictureReady);
   let priorScroll;
   for(const index of [0,3,7,1]) {
    await story.locator('[data-picture-index]').nth(index).click();
    const bounds=await story.evaluate(root=>{
     const viewport=document.getElementById('gallerySlides').getBoundingClientRect();
     const frame=root.querySelector('.picture-layer-0').getBoundingClientRect();
     const controls=root.querySelector('.picture-controls').getBoundingClientRect();
     return {top:viewport.top,bottom:viewport.bottom,frameTop:frame.top,frameBottom:frame.bottom,controlsTop:controls.top,controlsBottom:controls.bottom,scroll:document.getElementById('gallerySlides').scrollTop};
    });
    assert.ok(bounds.frameTop>=bounds.top-1,`${width}x${height}: image frame top visible ${JSON.stringify(bounds)}`);
    assert.ok(bounds.frameBottom<=bounds.bottom+1,`${width}x${height}: image frame bottom visible`);
    assert.ok(bounds.controlsTop>=bounds.top-1 && bounds.controlsBottom<=bounds.bottom+1,`${width}x${height}: switch controls remain visible`);
    if(priorScroll!==undefined) assert.ok(Math.abs(bounds.scroll-priorScroll)<2,`${width}x${height}: picture switches keep the scroll position`);
    priorScroll=bounds.scroll;
   }
   if(width===1366||width===390) await page.screenshot({path:`output/review/fitted-panel-${width}.png`});
   for(const project of [1,2,3,4,5,6,7]) {
    await page.locator(`[data-gallery-project="${project}"]`).click();
    const fit=await story.evaluate(root=>{
     const viewport=document.getElementById('gallerySlides').getBoundingClientRect();
     const frame=root.querySelector('.picture-layer-0').getBoundingClientRect();
     const controls=root.querySelector('.picture-controls').getBoundingClientRect();
     return frame.top>=viewport.top-1&&frame.bottom<=viewport.bottom+1&&controls.bottom<=viewport.bottom+1;
    });
    assert.ok(fit,`${width}x${height}: project ${project} fits the image panel`);
   }
   await page.close();
  }
  console.log('Image frame and switch controls fit together at five desktop / mobile sizes.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
