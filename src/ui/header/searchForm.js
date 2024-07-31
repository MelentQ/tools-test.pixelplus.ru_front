export default function searchForm() {
  const button = document.querySelector('.js-search-form-button');
  const panel = document.querySelector('.js-search-form');

  if (!button || !panel) return;

  const input = panel.querySelector('.js-search-form-input');

  button.addEventListener('click', () => {
    button.classList.toggle('--active');
    panel.classList.toggle('--active');
    if (panel.classList.contains('--active')) {
      setTimeout(() => input.focus(), 300);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      button.classList.remove('--active');
      panel.classList.remove('--active');
    }
  });

  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('.js-search-form')
      && !e.target.classList.contains('js-search-form')
      && !e.target.closest('.js-search-form-button')
      && !e.target.classList.contains('js-search-form-button')
    ) {
      button.classList.remove('--active');
      panel.classList.remove('--active');
    }
  });
}
