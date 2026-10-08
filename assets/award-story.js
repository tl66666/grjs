(function () {
  'use strict';

  const data = JSON.parse(document.getElementById('gallery-data').textContent);
  const slides = data.slides;
  const tabs = Array.from(document.querySelectorAll('.moment-tabs [role="tab"]'));
  const image = document.getElementById('gallery-image');
  const photoButton = document.getElementById('photo-open');
  const title = document.getElementById('moment-title');
  const description = document.getElementById('moment-description');
  const kicker = document.getElementById('moment-kicker');
  const panel = document.getElementById('story-panel');
  const caption = document.getElementById('photo-caption');
  const status = document.getElementById('gallery-status');
  const viewer = document.getElementById('image-viewer');
  const viewerImage = document.getElementById('viewer-image');
  const viewerCaption = document.getElementById('viewer-caption');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cachedImages = new Map();
  let activeIndex = 0;
  let requestedIndex = 0;
  let requestVersion = 0;
  let suppressClickUntil = 0;

  function prepareImage(source) {
    if (!cachedImages.has(source)) {
      const prepared = new Image();
      prepared.src = source;
      cachedImages.set(source, prepared.decode().then(function () {
        return true;
      }).catch(function () {
        cachedImages.delete(source);
        return false;
      }));
    }
    return cachedImages.get(source);
  }

  function preloadNeighbors() {
    prepareImage(slides[(activeIndex + 1) % slides.length].src);
    prepareImage(slides[(activeIndex + slides.length - 1) % slides.length].src);
  }

  function updateViewer() {
    const slide = slides[activeIndex];
    viewerImage.src = slide.src;
    viewerImage.alt = slide.alt;
    viewerCaption.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')} · ${slide.caption}`;
    document.getElementById('viewer-original').href = slide.src;
  }

  function animateText(direction) {
    if (reducedMotion.matches) return;
    [kicker, title, description, caption].forEach(function (element, index) {
      element.getAnimations().forEach(function (animation) { animation.cancel(); });
      element.animate([
        { opacity: 0, transform: `translateY(${index === 3 ? 4 : 12}px) translateX(${direction * 3}px)` },
        { opacity: 1, transform: 'translateY(0) translateX(0)' }
      ], { duration: 480, delay: index * 35, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
    });
  }

  async function selectSlide(nextIndex, direction) {
    const targetIndex = (nextIndex + slides.length) % slides.length;
    requestedIndex = targetIndex;
    const version = ++requestVersion;
    if (targetIndex === activeIndex) {
      panel.removeAttribute('aria-busy');
      return;
    }
    const slide = slides[targetIndex];
    panel.setAttribute('aria-busy', 'true');
    const loaded = await prepareImage(slide.src);
    if (version !== requestVersion) return;
    panel.removeAttribute('aria-busy');
    if (!loaded) {
      requestedIndex = activeIndex;
      status.textContent = '照片暂时无法加载，请检查网络后重试。';
      return;
    }

    photoButton.querySelectorAll('[data-outgoing]').forEach(function (element) { element.remove(); });
    image.getAnimations().forEach(function (animation) { animation.cancel(); });
    if (!reducedMotion.matches) {
      const outgoing = image.cloneNode(true);
      outgoing.removeAttribute('id');
      outgoing.setAttribute('aria-hidden', 'true');
      outgoing.setAttribute('data-outgoing', '');
      outgoing.alt = '';
      image.before(outgoing);
      const exitAnimation = outgoing.animate([
        { opacity: 1, transform: 'translateX(0) scale(1)' },
        { opacity: 0, transform: `translateX(${-direction * 28}px) scale(.985)` }
      ], { duration: 300, easing: 'ease-out', fill: 'forwards' });
      exitAnimation.finished.then(function () { outgoing.remove(); }).catch(function () { outgoing.remove(); });
    }

    activeIndex = targetIndex;
    image.src = slide.src;
    image.alt = slide.alt;
    title.replaceChildren(...slide.title.map(function (line) {
      const span = document.createElement('span');
      span.textContent = line;
      return span;
    }));
    description.textContent = slide.description;
    kicker.textContent = slide.kicker;
    caption.textContent = slide.caption;
    const position = String(activeIndex + 1).padStart(2, '0');
    document.getElementById('moment-number').textContent = position;
    document.getElementById('frame-index').textContent = `${position} / ${String(slides.length).padStart(2, '0')}`;
    document.getElementById('current-position').textContent = position;
    document.getElementById('position-fill').style.width = `${(activeIndex + 1) / slides.length * 100}%`;
    tabs.forEach(function (tab, index) {
      tab.setAttribute('aria-selected', String(index === activeIndex));
      tab.tabIndex = index === activeIndex ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tabs[activeIndex].id);
    status.textContent = `第 ${activeIndex + 1} 张，共 ${slides.length} 张：${slide.label}。${slide.caption}`;
    history.replaceState(null, '', `${location.pathname}${location.search}#photo-${activeIndex + 1}`);
    if (!reducedMotion.matches) {
      image.animate([
        { opacity: 0, transform: `translateX(${direction * 34}px) scale(1.02)` },
        { opacity: 1, transform: 'translateX(0) scale(1)' }
      ], { duration: 600, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
    animateText(direction);
    if (viewer.open) updateViewer();
    preloadNeighbors();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { selectSlide(index, index >= activeIndex ? 1 : -1); });
    tab.addEventListener('keydown', function (event) {
      let targetIndex;
      if (event.key === 'ArrowRight') targetIndex = (requestedIndex + 1) % slides.length;
      else if (event.key === 'ArrowLeft') targetIndex = (requestedIndex + slides.length - 1) % slides.length;
      else if (event.key === 'Home') targetIndex = 0;
      else if (event.key === 'End') targetIndex = slides.length - 1;
      else return;
      event.preventDefault();
      event.stopPropagation();
      tabs[targetIndex].focus({ preventScroll: true });
      selectSlide(targetIndex, event.key === 'ArrowLeft' || event.key === 'Home' ? -1 : 1);
    });
  });

  document.getElementById('gallery-prev').addEventListener('click', function () { selectSlide(requestedIndex - 1, -1); });
  document.getElementById('gallery-next').addEventListener('click', function () { selectSlide(requestedIndex + 1, 1); });
  document.getElementById('viewer-prev').addEventListener('click', function () { selectSlide(requestedIndex - 1, -1); });
  document.getElementById('viewer-next').addEventListener('click', function () { selectSlide(requestedIndex + 1, 1); });

  document.addEventListener('keydown', function (event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      selectSlide(requestedIndex + (event.key === 'ArrowRight' ? 1 : -1), event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  function enableSwipe(element) {
    let pointerStart = null;
    element.addEventListener('pointerdown', function (event) {
      if (!event.isPrimary || event.button !== 0 || event.target.closest('.viewer-arrow')) return;
      pointerStart = { horizontal: event.clientX, vertical: event.clientY, id: event.pointerId };
      element.setPointerCapture(event.pointerId);
    });
    element.addEventListener('pointerup', function (event) {
      if (!pointerStart || pointerStart.id !== event.pointerId) return;
      const horizontal = event.clientX - pointerStart.horizontal;
      const vertical = event.clientY - pointerStart.vertical;
      pointerStart = null;
      if (Math.abs(horizontal) < 45 || Math.abs(horizontal) < Math.abs(vertical) * 1.4) return;
      suppressClickUntil = Date.now() + 350;
      selectSlide(requestedIndex + (horizontal < 0 ? 1 : -1), horizontal < 0 ? 1 : -1);
    });
    element.addEventListener('pointercancel', function () { pointerStart = null; });
  }

  enableSwipe(photoButton);
  enableSwipe(document.querySelector('.viewer-stage'));

  photoButton.addEventListener('click', function () {
    if (Date.now() < suppressClickUntil) return;
    updateViewer();
    viewer.showModal();
    document.body.classList.add('viewer-open');
    document.getElementById('viewer-close').focus();
  });
  document.getElementById('viewer-close').addEventListener('click', function () { viewer.close(); });
  viewer.addEventListener('close', function () {
    document.body.classList.remove('viewer-open');
    photoButton.focus({ preventScroll: true });
  });
  viewer.addEventListener('click', function (event) { if (event.target === viewer) viewer.close(); });

  window.addEventListener('hashchange', function () {
    const match = location.hash.match(/^#photo-([1-5])$/);
    if (match) selectSlide(Number(match[1]) - 1, 1);
  });
  const initialMatch = location.hash.match(/^#photo-([1-5])$/);
  if (initialMatch) selectSlide(Number(initialMatch[1]) - 1, 1);
  preloadNeighbors();
})();