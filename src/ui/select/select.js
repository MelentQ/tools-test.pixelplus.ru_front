import Choices from 'choices.js';

export default function select() {
  const containers = Array.from(document.querySelectorAll('.js-select:not(.--initialized)'));

  window.pts.selects = containers.map((container) => {
    const instance = new Choices(container, {
      searchEnabled: container.length > 10,
      searchPlaceholderValue: 'Поиск',
      loadingText: 'Загрузка',
      noResultsText: 'Совпадений не найдено',
      noChoicesText: 'Нет вариантов для выбора',
      itemSelectText: '',
      addItemText: (value) => `Нажмите Enter, чтобы добавить <b>"${value}"</b>`,
      maxItemText: (maxItemCount) => `Можно добавить только ${maxItemCount} элементов`,
      shouldSort: false,
      allowHTML: false,
      callbackOnCreateTemplates: () => ({
        itemList(...args) {
          const div = Choices.defaults.templates.itemList.call(this, ...args);
          div.setAttribute('role', 'listbox');
          return div;
        },
        item(...args) {
          const div = Choices.defaults.templates.item.call(this, ...args);
          div.setAttribute('role', 'option');
          return div;
        },
        input(...args) {
          const input = Choices.defaults.templates.input.call(this, ...args);
          Object.assign(input.dataset, {
            parsleyExcluded: true,
          });
          return input;
        },
        dropdown(...args) {
          const div = Choices.defaults.templates.dropdown.call(this, ...args);
          Object.assign(div.dataset, {
            lenisPrevent: '',
          });
          return div;
        },
      }),
      callbackOnInit() {
        container.classList.add('--initialized');
      },
    });

    // Сброс Choices при сбросе формы
    const form = container.closest('form');
    if (form) {
      form.addEventListener('reset', () => {
        instance.destroy();
        instance.init();
      });
    }

    return instance;
  });
}

window.pts.Choices = Choices;
