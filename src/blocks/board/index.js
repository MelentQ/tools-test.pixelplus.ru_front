document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-board:not(.--initialized)');
  containers.forEach((container) => {
    container.classList.add('--initialized');

    const name = container.getAttribute('data-name');
    if (!name) return;

    const cookieName = `is-${name}-board-disabled`;

    const isBoardDisabled = window.pts.Cookie.get(cookieName);

    if (!isBoardDisabled) {
      container.classList.add('--visible');

      const button = container.querySelector('.js-board-close-button');
      button.addEventListener('click', () => {
        container.classList.remove('--visible');
        window.pts.Cookie.set(cookieName, '1');
      });
    }
  });
});
