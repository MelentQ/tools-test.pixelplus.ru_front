document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-sprite-list:not(.--initialized)');
  containers.forEach((container) => {
    container.classList.add('--initialized');
  });
});
