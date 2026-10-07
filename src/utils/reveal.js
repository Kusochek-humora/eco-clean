// Появление блоков при скролле (fade + сдвиг вверх). Стили — src/styles/base/_reveal.scss:
// скрытое состояние задаёт css (только когда включён js и нет prefers-reduced-motion),
// здесь только добавляем .is-visible, когда элемент попадает в экран.
const TARGETS = [
  'main > section:not(.hero):not(.advantages):not(.faq)',
  '.footer',
  '.advantages__card',
  '.faq__title',
  '.faq__item',
].join(', ');

const STAGGER = ['.advantages__card', '.faq__item'];
const STEP = 0.1; // секунд между карточками в ряду

export function initReveal() {
  const items = [...document.querySelectorAll(TARGETS)];
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // ступенчатая задержка для карточек внутри одного списка
  STAGGER.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      const column = el.parentElement.children;
      el.style.setProperty('--reveal-delay', `${Math.min([...column].indexOf(el), 4) * STEP}s`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  items.forEach((el) => observer.observe(el));
}
