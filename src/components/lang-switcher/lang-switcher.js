import './lang-switcher.scss';

import { i18next, setLanguage } from '@/i18n';

export function initLangSwitcher() {
  const root = document.querySelector('.lang-switcher');
  if (!root) return;

  const toggle = root.querySelector('.lang-switcher__current');
  const list = root.querySelector('.lang-switcher__list');
  const label = root.querySelector('[data-lang-current]');
  const buttons = root.querySelectorAll('[data-lang]');

  const setOpen = (open) => {
    list.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-open', open);
  };

  const updateActive = () => {
    label.textContent = i18next.language.toUpperCase();
    buttons.forEach((btn) => {
      const active = btn.dataset.lang === i18next.language;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  };

  toggle.addEventListener('click', () => setOpen(list.hidden));
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      setOpen(false);
    });
  });
  document.addEventListener('click', (e) => !root.contains(e.target) && setOpen(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));

  i18next.on('languageChanged', updateActive);
  updateActive();
}
