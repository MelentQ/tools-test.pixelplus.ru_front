import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import paginationOptions from '@/components/slider/paginationOptions';
import hideLoader from '@/components/slider/hideLoader';

Swiper.use([Pagination]);

document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-register-advantages:not(.--initialized)')];
  containers.map((container) => {
    let instance;

    function init() {
      if (window.matchMedia('(max-width: 767px)').matches) {
        if (!instance) {
          instance = new Swiper(container.querySelector('.swiper'), {
            slidesPerView: 1,
            spaceBetween: 16,
            autoHeight: true,
            pagination: {
              el: container.querySelector('.slider-pagination'),
              ...paginationOptions,
            },
            on: {
              init: hideLoader,
            },
          });
        }
      } else {
        const loader = container.querySelector('.loader');
        if (loader) {
          loader.classList.remove('loader');
        }

        if (instance) {
          instance.destroy();
          instance = undefined;
        }
      }
    }

    init();

    window.addEventListener('resize', init);

    container.classList.add('--initialized');

    return instance;
  });
});
