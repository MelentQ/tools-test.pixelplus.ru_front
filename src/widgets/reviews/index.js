import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import paginationOptions from '@/components/slider/paginationOptions';
import navigationOptions from '@/components/slider/navigationOptions';
import hideLoader from '@/components/slider/hideLoader';

Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-reviews:not(.--initialized)')];
  containers.map((container) => new Swiper(container.querySelector('.swiper'), {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoHeight: true,
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
        spaceBetween: 20,
        slidesPerView: 2,
        autoHeight: false,
      },
      992: {
        spaceBetween: 24,
        slidesPerView: 3,
        autoHeight: false,
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
