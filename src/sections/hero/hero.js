import './hero.scss';

const DURATION = 1800;
const easeOutCubic = (t) => 1 - (1 - t) ** 3;

// Числа в статистике «набегают» от 0 до значения при первом появлении блока
export function initHero() {
  const counters = document.querySelectorAll('.hero [data-count]');
  if (!counters.length) return;

  // ширину фиксируем по итоговому числу, иначе соседний текст дёргается
  counters.forEach((el) => {
    el.style.minWidth = `${el.dataset.count.length}ch`;
  });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const run = (el) => {
    const target = Number(el.dataset.count);
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      el.textContent = Math.round(target * easeOutCubic(progress));
      if (progress < 1) requestAnimationFrame(tick);
    };

    el.textContent = 0;
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        run(entry.target);
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => observer.observe(el));
}
