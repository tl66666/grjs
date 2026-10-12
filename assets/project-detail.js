(() => {
  const dialog = document.getElementById('detailViewer');
  const image = document.getElementById('detailViewerImage');
  const title = document.getElementById('detailViewerTitle');
  let trigger;
  document.querySelectorAll('[data-full-image]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !dialog.showModal) return;
    event.preventDefault();
    trigger = link;
    image.src = link.href;
    image.alt = link.dataset.fullImage;
    title.textContent = link.dataset.fullImage;
    dialog.showModal();
    document.getElementById('detailViewerClose').focus();
  }));
  document.getElementById('detailViewerClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => trigger?.focus({ preventScroll:true }));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
