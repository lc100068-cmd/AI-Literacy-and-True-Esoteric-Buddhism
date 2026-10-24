(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reduced.matches) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -15px 0px' });
    document.querySelectorAll('.reveal, .cosmos-scene').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal, .cosmos-scene').forEach(el => el.classList.add('in-view'));
  }
  const progress = document.querySelector('.progress');
  let queued = false;
  function updateProgress() {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? Math.max(0, Math.min(1, window.scrollY / height)) : 0})`;
    queued = false;
  }
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; window.requestAnimationFrame(updateProgress); }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
