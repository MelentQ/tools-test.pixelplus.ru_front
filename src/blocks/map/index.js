document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-map:not(.--initialized)');
  containers.forEach((container) => {
    const button = container.querySelector('.js-contacts-button');
    if (!button) return;

    const src = container.getAttribute('data-src');
    if (!src) return;

    button.addEventListener('click', () => {
      container.innerHTML = `<iframe src="${src}"></iframe>`;
    });
  });
});
