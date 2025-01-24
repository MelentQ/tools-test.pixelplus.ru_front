document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-register:not(.--initialized)');
  containers.forEach((container) => {
    container.classList.add('--initialized');
  });
});
