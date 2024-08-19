export default function tabs() {
  function reset(item) {
    item.classList.remove('--active');
  }

  const containers = document.querySelectorAll('.js-tabs:not(.--initialized)');
  containers.forEach((container) => {
    const buttons = container.querySelectorAll('.js-tabs-button');
    const panels = [...container.querySelectorAll('.js-tabs-panel')];

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        const targetPanel = panels.find((panel) => panel.matches(`[data-key="${key}"]`));
        if (!targetPanel) return;

        buttons.forEach(reset);
        panels.forEach(reset);

        button.classList.add('--active');
        targetPanel.classList.add('--active');
      });
    });
  });
}
