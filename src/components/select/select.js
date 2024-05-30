import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.css';

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
      callbackOnInit() {
        this.dropdown.element.setAttribute('data-lenis-prevent', '');
        this.containerOuter.element.append(Object.assign(document.createElement('div'), {
          innerHTML: '<svg><use xlink:href="#triangle"></use></svg>',
          className: 'select__arrow',
        }));

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
