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
        container.classList.add('--initialized');
      },
      callbackOnCreateTemplates: () => ({
        input: (...args) => {
          const wrapper = Object.assign(document.createElement('div'), {
            className: 'choices__input-wrapper',
          });
          wrapper.append(Choices.defaults.templates.input.call(this, ...args));
          return wrapper;
        },
      }),
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
