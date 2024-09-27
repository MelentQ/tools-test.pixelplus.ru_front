export default function userDropdown() {
  const dropdown = document.querySelector('.js-user-dropdown');
  if (!dropdown) return;

  const button = dropdown.querySelector('.js-user-dropdown-button');

  button.addEventListener('click', () => {
    dropdown.classList.toggle('--active');
  });

  document.addEventListener('mousedown', (e) => {
    if (e.target && !e.target.closest('.js-user-dropdown')) {
      dropdown.classList.remove('--active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('--active');
    }
  });
}
