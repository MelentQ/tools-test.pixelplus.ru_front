document.addEventListener('DOMContentLoaded', () => {
  const containers = [...document.querySelectorAll('.js-cards-slider:not(.--initialized)')];
  containers.map((container) => new window.pts.slider.Swiper(container.querySelector('.swiper'), {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
      el: container.querySelector('.slider-pagination'),
      ...window.pts.slider.paginationOptions,
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
        window.pts.slider.hideLoader(swiper);

        container.classList.add('--initialized');
      },
    },
  }));
});
