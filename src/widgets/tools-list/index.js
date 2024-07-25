import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import paginationOptions from '@/components/slider/paginationOptions';
import hideLoader from '@/components/slider/hideLoader';
import showLoader from '@/components/slider/showLoader';

Swiper.use([Pagination]);

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-tools-list:not(.--initialized)');
  containers.forEach((container) => {
    let currentTabIndex = 0;
    const tabs = [...container.querySelectorAll('.js-tools-list-tab')];
    const panels = container.querySelectorAll('.js-tools-list-panel');
    let instance;

    function init() {
      if (window.matchMedia('(max-width: 991px)').matches) {
        if (!instance) {
          instance = new Swiper(panels[currentTabIndex].querySelector('.swiper'), {
            slidesPerView: 2,
            spaceBetween: 16,
            pagination: {
              el: panels[currentTabIndex].querySelector('.slider-pagination'),
              type: 'progressbar',
              ...paginationOptions,
            },
            breakpoints: {
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            },
            on: {
              init: hideLoader,
              destroy: showLoader,
            },
          });
        }
      } else {
        if (instance) {
          instance.destroy();
          instance = undefined;
        }

        const loader = panels[currentTabIndex].querySelector('.loader');
        if (loader) {
          loader.classList.remove('loader');
        }
      }
    }

    init();

    window.addEventListener('resize', init);

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs[currentTabIndex].classList.remove('--active');
        panels[currentTabIndex].classList.remove('--active');
        tabs[i].classList.add('--active');
        panels[i].classList.add('--active');
        currentTabIndex = i;

        if (instance) {
          instance.destroy();
          instance = undefined;
        }

        init();
      });
    });

    container.classList.add('--initialized');
  });
});
