import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import paginationOptions from '@/components/slider/paginationOptions';
import navigationOptions from '@/components/slider/navigationOptions';
import hideLoader from '@/components/slider/hideLoader';

Swiper.use([Autoplay, Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-partners:not(.--initialized)')];
  containers.map((container) => new Swiper(container.querySelector('.swiper'), {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: {
      delay: 5000,
    },
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
