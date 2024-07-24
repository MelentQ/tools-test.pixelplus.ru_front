import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import paginationOptions from '@/components/slider/paginationOptions';
import hideLoader from '@/components/slider/hideLoader';
import navigationOptions from '@/components/slider/navigationOptions';

Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-cards-slider:not(.--initialized)')];
  containers.map((container) => new Swiper(container.querySelector('.swiper'), {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      prevEl: container.querySelector('.slider-navigation__item--prev'),
      nextEl: container.querySelector('.slider-navigation__item--next'),
      ...navigationOptions,
    },
    pagination: {
      el: container.querySelector('.slider-pagination'),
      ...paginationOptions,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 4,
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
