document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-cases:not(.--initialized)')];
  containers.map((container) => new window.pts.Swiper(container.querySelector('.swiper'), {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoHeight: true,
    navigation: {
      prevEl: container.querySelector('.slider-navigation__item--prev'),
      nextEl: container.querySelector('.slider-navigation__item--next'),
      ...window.pts.utils.slider.navigationOptions,
    },
    pagination: {
      el: container.querySelector('.slider-pagination'),
      ...window.pts.utils.slider.paginationOptions,
    },
    breakpoints: {
      768: {
        spaceBetween: 20,
      },
      992: {
        spaceBetween: 24,
      },
    },
    on: {
      init(swiper) {
        window.pts.utils.slider.hideLoader(swiper);

        container.classList.add('--initialized');
      },
    },
  }));
});
