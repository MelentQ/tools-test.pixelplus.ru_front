export default function closable() {
  document.addEventListener('mousedown', (e) => {
    if (e.target && (e.target.closest('.js-closable-button') || e.target.classList.contains('js-closable-button'))) {
      const element = e.target.closest('.js-closable');
      if (!element) return;

      element.remove();
    }
  });
}
