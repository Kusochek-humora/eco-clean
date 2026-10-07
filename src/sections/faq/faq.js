import './faq.scss';

// Аккордеон: каждый вопрос открывается и закрывается независимо.
// Состояние хранится в aria-expanded у кнопки и классе is-open у пункта (css анимирует высоту).
export function initFaq() {
  document.querySelectorAll('.faq__item').forEach((item) => {
    const btn = item.querySelector('.faq__btn');
    btn.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
}
