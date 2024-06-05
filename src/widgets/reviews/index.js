document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-reviews:not(.--initialized)')];
  containers.map((container) => new window.pts.slider.Swiper(container.querySelector('.swiper'), {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoHeight: true,
    navigation: {
      prevEl: container.querySelector('.slider-navigation__item--prev'),
      nextEl: container.querySelector('.slider-navigation__item--next'),
      ...window.pts.slider.navigationOptions,
    },
    pagination: {
      el: container.querySelector('.slider-pagination'),
      ...window.pts.slider.paginationOptions,
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
        window.pts.slider.hideLoader(swiper);

        container.classList.add('--initialized');
      },
    },
  }));
});
