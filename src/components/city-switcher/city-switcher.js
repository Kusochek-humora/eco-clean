import './city-switcher.scss';

import { t } from '@/i18n';

const STORAGE_KEY = 'city';
const CITIES = ['almaty', 'astana'];

export function initCitySwitcher() {
  const root = document.querySelector('.city-switcher');
  if (!root) return;

  const toggle = root.querySelector('.city-switcher__current');
  const list = root.querySelector('.city-switcher__list');
  const label = root.querySelector('[data-city-current]');
  const buttons = root.querySelectorAll('[data-city]');

  const saved = localStorage.getItem(STORAGE_KEY);
  let city = CITIES.includes(saved) ? saved : CITIES[0];

  const setOpen = (open) => {
    list.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };

  // подпись переводится через data-i18n, поэтому при смене языка обновится сама
  const render = () => {
    label.dataset.i18n = `header.cities.${city}`;
    label.textContent = t(label.dataset.i18n);
    buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.city === city));
  };

  toggle.addEventListener('click', () => setOpen(list.hidden));
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      city = btn.dataset.city;
      localStorage.setItem(STORAGE_KEY, city);
      render();
      setOpen(false);
      document.dispatchEvent(new CustomEvent('city:change', { detail: city }));
    });
  });
  document.addEventListener('click', (e) => !root.contains(e.target) && setOpen(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));

  render();
}
