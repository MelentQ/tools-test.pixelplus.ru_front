export default function burgerMenu() {
  const button = document.querySelector('.js-burger-menu-button');
  const panel = document.querySelector('.js-burger-menu');

  if (!button || !panel) return;

  button.addEventListener('click', () => {
    panel.classList.toggle('--active');
    button.classList.toggle('--active');
  });

  function close() {
    panel.classList.remove('--active');
    button.classList.remove('--active');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      close();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('.js-burger-menu-button')
      && !e.target.classList.contains('js-burger-menu-button')
      && !e.target.closest('.js-burger-menu')
      && !e.target.classList.contains('js-burger-menu')
    ) {
      close();
    }
  });

  // Используется в модалках:
  // на открытие модалки нужно закрывать меню,
  // чтобы красиво было
  window.pts.closeBurgerMenu = close;
}
