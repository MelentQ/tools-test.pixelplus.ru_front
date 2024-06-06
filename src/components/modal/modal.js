import { Fancybox } from '@fancyapps/ui';

Fancybox.defaults.closeButton = false;
window.pts.Fancybox = Fancybox;

export default function modal() {
  Fancybox.bind('[data-fancybox]:not([data-fancybox="modal"])');

  Fancybox.bind('[data-fancybox="modal"]', {
    groupAttr: false,
    Hash: false,
    defaultDisplay: 'block',
    dragToClose: false,
    on: {
      reveal: () => {
        // Закрываем меню
        if (window.pts && window.pts.closeBurgerMenu) {
          window.pts.closeBurgerMenu();
        }
      },
      done: (instance) => {
        instance.container.setAttribute('data-lenis-prevent', '');

        // Инициализируем валидацию формы, если она пришла через Ajax
        if (window.pts && window.pts.initValidation) {
          window.pts.initValidation();
        }

        // Инициализируем обработчик формы, если она пришла через Ajax
        if (window.pts && window.pts.handleForms) {
          window.pts.handleForms();
        }

        // Инициализируем телефонный инпут, если он пришел через Ajax
        if (window.pts && window.pts.initPhoneInputs) {
          window.pts.initPhoneInputs();
        }
      },
    },
  });
}
