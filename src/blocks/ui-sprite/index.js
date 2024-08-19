document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-ui-sprite:not(.--initialized)');
  containers.forEach((container) => {
    container.classList.add('--initialized');
  });
});
