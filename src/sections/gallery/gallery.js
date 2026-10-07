import 'swiper/css';
import './gallery.scss';

import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';

// Для бесконечной прокрутки (loop) слайдов должно быть больше, чем помещается на экран:
// 4 слайда на десктопе занимают всю ширину, поэтому добавляем копии (скрыты от скринридеров).
function ensureEnoughSlides(wrapper, min = 8) {
  const originals = [...wrapper.children];
  let count = originals.length;

  while (count < min) {
    originals.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      const img = clone.querySelector('img');
      if (img) {
        img.alt = '';
        img.removeAttribute('data-i18n-alt');
      }
      wrapper.append(clone);
      count += 1;
    });
  }
}

export function initGallery() {
  const slider = document.querySelector('.gallery__slider');
  if (!slider) return;

  ensureEnoughSlides(slider.querySelector('.swiper-wrapper'));

  // ширина слайдов задаётся в css (310px на десктопе), поэтому slidesPerView: 'auto'
  new Swiper(slider, {
    modules: [Navigation, Keyboard],
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    keyboard: { enabled: true },
    navigation: {
      prevEl: '.gallery__arrow--prev',
      nextEl: '.gallery__arrow--next',
    },
  });
}
