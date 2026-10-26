'use strict';
(() => {
  const stages = [...document.querySelectorAll('[data-canvas-width]')];
  const vectors = [...document.querySelectorAll('[data-vector-fit]')];
  const fit = () => {
    stages.forEach(stage => {
      const width = Number(stage.dataset.canvasWidth);
      const height = Number(stage.dataset.canvasHeight);
      const scale = stage.clientWidth / width;
      stage.style.setProperty('--canvas-scale', String(scale || 1));
      stage.style.height = `${height * scale}px`;
      stage.firstElementChild.style.transform = `scale(${scale})`;
    });
    vectors.forEach(slot => {
      const image = slot.querySelector('img');
      if (!image) return;
      const width = Number(image.getAttribute('width'));
      const height = Number(image.getAttribute('height'));
      let x = slot.clientWidth / width;
      let y = slot.clientHeight / height;
      if (slot.dataset.vectorFit === 'contain') x = y = Math.min(x, y);
      image.style.transform = `scale(${x},${y})`;
      if (slot.classList.contains('case-arrow')) {
        image.style.left = `${(slot.clientWidth - width * x) / 2}px`;
        image.style.top = `${(slot.clientHeight - height * y) / 2}px`;
      }
    });
    // Native diagrams scale as a unit; align the smaller arrow to the label's
    // first line instead of retaining the original large arrow's top edge.
    document.querySelectorAll('[data-caption-for]').forEach(arrow => {
      const canvas = arrow.closest('.fw-diagram-canvas');
      const label = [...canvas.querySelectorAll('[data-design-node]')]
        .find(node => node.dataset.designNode === arrow.dataset.captionFor);
      if (!label) return;
      const lineHeight = parseFloat(getComputedStyle(label).lineHeight);
      const arrowHeight = parseFloat(getComputedStyle(arrow).height);
      arrow.style.top = `${parseFloat(label.style.top) + (lineHeight - arrowHeight) / 2}px`;
    });
  };
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(fit);
    [...stages, ...vectors].forEach(el => observer.observe(el));
  } else window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  fit();
})();
