import './header.scss';

export function initHeader() {
  const header = document.querySelector('.header');
  const burger = header?.querySelector('.header__burger');
  if (!burger) return;

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  header.querySelectorAll('.header__nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  // клик по затемнению (вне хедера и панели) и Escape закрывают меню
  document.addEventListener('click', (e) => !header.contains(e.target) && setOpen(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  // при переходе на десктоп сбрасываем состояние
  window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => e.matches && setOpen(false));
}
