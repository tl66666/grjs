(() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function render(items, id) {
    const data = encodeURIComponent(JSON.stringify(items));
    return '<section class="picture-story" data-picture-story="'+escape(id)+'" data-picture-items="'+data+'" aria-label="项目界面与说明">' +
      '<div class="picture-stage" aria-label="当前图片与后续预览"></div>' +
      '<div class="picture-heading"><h4 data-picture-title></h4><span data-picture-counter></span></div>' +
      '<p class="picture-description" data-picture-description aria-live="polite"></p>' +
      '<div class="picture-controls"><button type="button" data-picture-step="-1" aria-label="上一张图片">←</button><div class="picture-tabs" role="group" aria-label="选择项目图片">' +
      items.map((item,index) => '<button type="button" data-picture-index="'+index+'" aria-pressed="false">'+escape(item.label)+'</button>').join('') +
      '</div><button type="button" data-picture-step="1" aria-label="下一张图片">→</button></div></section>';
  }
  function init(scope = document) {
    scope.querySelectorAll('[data-picture-story]').forEach(root => {
      if (root.dataset.pictureReady) return;
      root.dataset.pictureReady = 'true';
      const items = JSON.parse(decodeURIComponent(root.dataset.pictureItems));
      let current = 0;
      let downX = null;
      let suppressClick = false;
      const stage = root.querySelector('.picture-stage');
      function show(index, restoreFocus = false) {
        current = (index + items.length) % items.length;
        root.classList.toggle('picture-portrait', items[current].orientation === 'portrait');
        stage.innerHTML = Array.from({length:Math.min(3,items.length)},(_,offset) => {
          const index = (current+offset)%items.length, item=items[index];
          const preview = offset===0 ? ' data-preview-src="'+escape(item.src)+'" data-preview-title="'+escape(item.previewTitle || item.label)+'"' : '';
          return '<button type="button" class="picture-layer picture-layer-'+offset+'" data-picture-layer="'+index+'"'+preview+' aria-label="'+escape(offset===0 ? '当前：'+item.label : '切换到'+item.label)+'"><img src="'+escape(item.src)+'" alt="'+escape(item.label)+'" draggable="false"><span>'+escape(offset===0 ? '当前界面' : item.label)+'</span></button>';
        }).reverse().join('');
        root.querySelector('[data-picture-title]').textContent=items[current].label;
        root.querySelector('[data-picture-description]').textContent=items[current].description;
        root.querySelector('[data-picture-counter]').textContent=String(current+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');
        root.querySelectorAll('[data-picture-index]').forEach(button=>button.setAttribute('aria-pressed', String(Number(button.dataset.pictureIndex)===current)));
        if(restoreFocus) root.querySelector('[data-picture-index="'+current+'"]').focus({preventScroll:true});
      }
      root.addEventListener('click',event=>{
        if(suppressClick) {event.preventDefault();event.stopPropagation();suppressClick=false;return;}
        const button=event.target.closest('button'); if(!button)return;
        if(button.hasAttribute('data-picture-index')) show(Number(button.dataset.pictureIndex));
        else if(button.hasAttribute('data-picture-step')) show(current+Number(button.dataset.pictureStep));
        else if(button.hasAttribute('data-picture-layer') && Number(button.dataset.pictureLayer)!==current) {event.stopPropagation();show(Number(button.dataset.pictureLayer),true);}
      });
      root.addEventListener('keydown',event=>{
        if(event.key==='ArrowLeft'||event.key==='ArrowRight') {event.preventDefault();event.stopPropagation();show(current+(event.key==='ArrowRight'?1:-1),true);}
      });
      stage.addEventListener('pointerdown',event=>{downX=event.clientX;});
      stage.addEventListener('pointercancel',()=>{downX=null;});
      stage.addEventListener('pointerup',event=>{
        if(downX!==null && Math.abs(event.clientX-downX)>45) {show(current+(event.clientX<downX?1:-1));suppressClick=true;setTimeout(()=>{suppressClick=false;},0);}
        downX=null;
      });
      show(0);
    });
  }
  window.PictureStory={render,init};
})();
