document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-multi-button:not(.--initialized)');
  containers.forEach((container) => {
    const button = container.querySelector('.js-multi-button-trigger');

    button.addEventListener('click', () => {
      container.classList.toggle('--active');
    });

    document.addEventListener('mousedown', (e) => {
      if (e.target && !e.target.closest('.js-multi-button-trigger')) {
        container.classList.remove('--active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        container.classList.remove('--active');
      }
    });
  });
});
