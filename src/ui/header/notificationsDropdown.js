export default function notificationsDropdown() {
  const dropdown = document.querySelector('.js-notifications-dropdown');
  if (!dropdown) return;

  const button = dropdown.querySelector('.js-notifications-dropdown-button');

  button.addEventListener('click', () => {
    dropdown.classList.toggle('--active');
  });

  document.addEventListener('mousedown', (e) => {
    if (e.target && !e.target.closest('.js-notifications-dropdown')) {
      dropdown.classList.remove('--active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('--active');
    }
  });
}
