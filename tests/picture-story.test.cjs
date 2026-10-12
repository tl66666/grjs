const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'C:/Users/唐乐/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.env.PORTFOLIO_URL||'http://127.0.0.1:8765';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.goto(origin,{waitUntil:'domcontentloaded'});
  await page.locator('#work-health [data-open-project]').click();
  const story=page.locator('.project-slide.active [data-picture-story]');
  assert.equal(await story.count(),1,'Project images use one stacked viewer');
  assert.equal(await story.locator('.picture-layer').count(),3,'Current image with two partial previews');
  assert.ok(await story.locator('[data-picture-index]').count()>=8);
  const before=await story.locator('[data-picture-title]').innerText();
  await story.locator('.picture-stage').scrollIntoViewIfNeeded();
  const rearPoint=await story.locator('.picture-stage').evaluate(stage=>{
   const rect=stage.getBoundingClientRect(), target=stage.querySelector('.picture-layer-1');
   for(let x=Math.min(rect.right,innerWidth)-8;x>rect.left;x-=8) for(let y=Math.max(rect.top,150)+20;y<Math.min(rect.bottom,innerHeight-100);y+=14) {
    if(document.elementFromPoint(x,y)?.closest('button')===target)return {x,y};
   }
   return null;
  });
  assert.ok(rearPoint,'Rear screenshot has a clickable exposed preview');
  await page.mouse.click(rearPoint.x,rearPoint.y);
  assert.notEqual(await story.locator('[data-picture-title]').innerText(),before);
  assert.ok((await story.locator('[data-picture-description]').innerText()).length>15);
  await story.locator('[data-picture-index]').nth(2).focus();
  await page.keyboard.press('ArrowRight');
  assert.match(await page.locator('.project-slide.active .project-slide-title').innerText(),/和生序/,'Image keys do not change projects');
  await page.locator('[data-gallery-project="7"]').click();
  assert.equal(await story.locator('[data-picture-index]').count(),8,'All four maps and four cards selectable');
  for(let i=0;i<8;i++) {
   await story.locator('[data-picture-index]').nth(i).click();
   await story.locator('.picture-layer-0 img').evaluate(img=>img.decode());
   assert.ok((await story.locator('[data-picture-description]').innerText()).length>15);
  }
  await story.locator('[data-picture-index]').first().click();
  await story.scrollIntoViewIfNeeded();
  await page.screenshot({path:'output/review/stacked-game-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await story.scrollIntoViewIfNeeded();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.screenshot({path:'output/review/stacked-game-mobile.png'});
  assert.equal(await page.locator('a').filter({hasText:'完整图集'}).count(),0);
  const readme=fs.readFileSync('README.md','utf8');
  assert.match(readme,/字节跳动 TRAE AI 创造力大赛/);
  await page.goto(origin+'/project-heshengxu.html',{waitUntil:'domcontentloaded'});
  await page.waitForURL(/index.html\?project=health/);
  assert.match(await page.locator('.project-slide.active .project-slide-title').innerText(),/和生序/);
  assert.equal(await page.locator('.project-slide.active .project-platforms article').count(),2);
  await page.setViewportSize({width:1440,height:1000});
  assert.equal(await story.evaluate(root=>getComputedStyle(root).position),'static','Pictures and project text use the same scroll flow');
  assert.ok((await story.locator('.picture-description').innerText()).length+(await story.locator('.picture-notes').innerText()).length>150);
  assert.equal(await page.locator('.project-slide.active .project-slide-body').evaluate(body=>body.firstElementChild.matches('.picture-story')),true,'Pictures precede long implementation details');
  await story.scrollIntoViewIfNeeded();
  await story.locator('.picture-layer-0 img').evaluate(img=>img.decode());
  await page.screenshot({path:'output/review/stacked-health-desktop.png'});
  await page.locator('[data-gallery-project="1"]').click();
  await story.scrollIntoViewIfNeeded();
  const rendered=await story.locator('.picture-layer-0 img').evaluate(async img=>{await img.decode();const r=img.getBoundingClientRect();return Math.min(r.width,r.height*img.naturalWidth/img.naturalHeight);});
  assert.ok(rendered>600,`Landscape screenshots are readable at ${rendered}px wide`);
  await page.screenshot({path:'output/review/large-zhitu-desktop.png'});
  console.log('Stacked picture stories passed: complete primary image, partial previews, all maps/cards, descriptions, keyboard, mobile and integrated entry.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
