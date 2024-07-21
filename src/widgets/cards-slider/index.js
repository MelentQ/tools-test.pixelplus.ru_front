import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import paginationOptions from '@/components/slider/paginationOptions';
import hideLoader from '@/components/slider/hideLoader';

Swiper.use([Pagination]);

document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-cards-slider:not(.--initialized)')];
  containers.map((container) => new Swiper(container.querySelector('.swiper'), {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
      el: container.querySelector('.slider-pagination'),
      ...paginationOptions,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
    on: {
      init(swiper) {
        hideLoader(swiper);

        container.classList.add('--initialized');
      },
    },
  }));
});
