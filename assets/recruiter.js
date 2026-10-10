(() => {
  const root = document.documentElement;
  const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const control = document.getElementById('motionControl');
  let manualPause = false;
  try { manualPause = localStorage.getItem('portfolio-motion') === 'paused'; } catch (_) {}
  const visibleVideos = new Set();
  const managedVideos = new WeakSet();
  const paused = () => manualPause || mediaQuery.matches || !!connection?.saveData;
  function syncVideo(video) {
    if (paused() || document.hidden || !visibleVideos.has(video)) { video.pause(); return; }
    if (video.dataset.src && !video.getAttribute('src')) { video.src = video.dataset.src; video.load(); }
    if (video.getAttribute('src')) video.play().catch(() => {});
  }
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleVideos.add(entry.target);
      else visibleVideos.delete(entry.target);
      syncVideo(entry.target);
    });
  }, { threshold: .12 });
  window.managePortfolioVideos = function(scope = document) {
    scope.querySelectorAll('video').forEach(video => {
      if (managedVideos.has(video)) return;
      managedVideos.add(video);
      video.autoplay = false;
      video.preload = 'none';
      videoObserver.observe(video);
    });
  };
  function syncMotion() {
    root.classList.toggle('motion-paused', paused());
    control.textContent = paused() ? '动效已暂停' : '暂停动效';
    control.setAttribute('aria-pressed', String(paused()));
    control.disabled = mediaQuery.matches || !!connection?.saveData;
    control.title = control.disabled ? '遵循系统减少动效或节省流量设置' : '控制背景视频和页面动画';
    document.querySelectorAll('video').forEach(syncVideo);
  }
  control.addEventListener('click', () => {
    manualPause = !manualPause;
    try { localStorage.setItem('portfolio-motion', manualPause ? 'paused' : 'running'); } catch (_) {}
    syncMotion();
  });
  mediaQuery.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  window.managePortfolioVideos();
  syncMotion();

  const cards = [...document.querySelectorAll('.work-card')];
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      cards.forEach(card => { card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter); });
      document.getElementById('workCount').textContent = `${cards.filter(card => !card.hidden).length} / 7 个作品`;
    });
  });
  document.querySelectorAll('[data-open-project]').forEach(button => {
    button.addEventListener('click', () => window.enterGallery(Number(button.dataset.openProject)));
  });
  const galleryNav = document.getElementById('galleryProjects');
  PROJECT_DATA.forEach((project, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.galleryProject = index;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = `${String(index + 1).padStart(2, '0')} / ${project.name}`;
    button.addEventListener('click', () => window.navigateGallery(index));
    galleryNav.append(button);
  });
  const preview = document.getElementById('mediaPreview');
  let previewTrigger;
  document.getElementById('projectGallery').addEventListener('click', event => {
    const button = event.target.closest('[data-preview-src]');
    if (!button) return;
    previewTrigger = button;
    document.getElementById('mediaPreviewTitle').textContent = button.dataset.previewTitle;
    const img = document.getElementById('mediaPreviewImage');
    img.src = button.dataset.previewSrc;
    img.alt = button.dataset.previewTitle;
    preview.showModal();
    document.getElementById('mediaPreviewClose').focus();
  });
  document.getElementById('mediaPreviewClose').addEventListener('click', () => preview.close());
  preview.addEventListener('close', () => { if (previewTrigger?.isConnected) previewTrigger.focus({ preventScroll: true }); });
  preview.addEventListener('click', event => { if (event.target === preview) preview.close(); });
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cards.forEach(card => card.addEventListener('pointermove', event => {
      if (paused()) return;
      const copy = card.querySelector('.work-copy');
      const rect = copy.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    }, { passive: true }));
  }

  let pendingFrame = false;
  const navLinks = [...document.querySelectorAll('.nav-pill a[href^="#"]')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  function updateReading() {
    pendingFrame = false;
    const height = root.scrollHeight - innerHeight;
    root.style.setProperty('--reading-progress', `${height > 0 ? Math.min(100, scrollY / height * 100) : 0}%`);
    document.querySelector('.back-top').classList.toggle('is-visible', scrollY > 600);
    let current = sections[0]?.id;
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 160) current = section.id; });
    navLinks.forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', () => { if (!pendingFrame) { pendingFrame = true; requestAnimationFrame(updateReading); } }, { passive: true });
  addEventListener('resize', updateReading);
  updateReading();
})();
