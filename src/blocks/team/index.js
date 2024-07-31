document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-team:not(.--initialized)')];
  containers.map((container) => {
    let instance;

    function init() {
      if (window.matchMedia('(max-width: 767px)').matches) {
        if (!instance) {
          instance = new window.pts.Swiper(container.querySelector('.swiper'), {
            slidesPerView: 1,
            spaceBetween: 16,
            autoHeight: true,
            loop: true,
            pagination: {
              el: container.querySelector('.slider-pagination'),
              ...window.pts.utils.slider.paginationOptions,
            },
            on: {
              init: window.pts.utils.slider.hideLoader,
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
