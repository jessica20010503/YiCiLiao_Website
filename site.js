'use strict';
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
const progress = document.querySelector('.progress');
let progressQueued = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
  progressQueued = false;
}
function queueProgress() {
  if (!progressQueued) { progressQueued = true; window.requestAnimationFrame(updateProgress); }
}
window.addEventListener('scroll', queueProgress, { passive: true });
window.addEventListener('resize', queueProgress, { passive: true });
window.addEventListener('load', queueProgress);
updateProgress();
const chapterLinks = [...document.querySelectorAll('.case-aside a')];
const chapters = [...document.querySelectorAll('.case-section')];
if ('IntersectionObserver' in window && chapters.length) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      chapterLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-16% 0px -65% 0px', threshold: 0 });
  chapters.forEach(chapter => observer.observe(chapter));
}
const lightbox = document.querySelector('.image-dialog');
if (lightbox && typeof lightbox.showModal === 'function') {
  const viewer = lightbox.querySelector('.dialog-viewer');
  const enlarged = viewer.querySelector('img');
  const caption = lightbox.querySelector('.dialog-caption');
  const zoom = lightbox.querySelector('[data-zoom]');
  let opener = null;
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      opener = link;
      enlarged.src = link.href;
      enlarged.alt = link.dataset.caption || link.querySelector('img').alt;
      caption.textContent = enlarged.alt;
      viewer.classList.remove('is-zoomed');
      zoom.setAttribute('aria-pressed', 'false');
      zoom.textContent = '原尺寸';
      lightbox.showModal();
      document.body.classList.add('dialog-open');
      viewer.scrollTop = 0;
      viewer.scrollLeft = 0;
      lightbox.querySelector('[data-close]').focus();
    });
  });
  lightbox.querySelector('[data-close]').addEventListener('click', () => lightbox.close());
  zoom.addEventListener('click', () => {
    const active = viewer.classList.toggle('is-zoomed');
    zoom.setAttribute('aria-pressed', String(active));
    zoom.textContent = active ? '適合畫面' : '原尺寸';
    viewer.scrollTop = 0;
    viewer.scrollLeft = 0;
  });
  lightbox.addEventListener('click', event => {
    if (event.target !== lightbox) return;
    const box = lightbox.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    enlarged.removeAttribute('src');
    if (opener) opener.focus({ preventScroll: true });
  });
}
