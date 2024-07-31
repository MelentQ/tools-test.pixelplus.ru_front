import { Fancybox } from '@fancyapps/ui';
import $validation from '@/ui/form/validation';
import phoneInput from '@/ui/input/phoneInput';

Fancybox.defaults.closeButton = false;
Fancybox.defaults.on = {
  done: (instance) => {
    instance.container.setAttribute('data-lenis-prevent', '');
  },
};
window.pts.Fancybox = Fancybox;

export default function modal() {
  Fancybox.bind('[data-fancybox]:not([data-fancybox="modal"])');

  Fancybox.bind('[data-fancybox="modal"]', {
    groupAttr: false,
    Hash: false,
    defaultDisplay: 'block',
    closeExisting: true,
    dragToClose: false,
    on: {
      reveal: () => {
        // Закрываем меню
        if (window.pts && window.pts.closeBurgerMenu) {
          window.pts.closeBurgerMenu();
        }
      },
      done: (instance) => {
        Fancybox.defaults.on.done(instance);

        // Инициализируем валидацию формы, если она пришла через Ajax
        $validation();

        // Инициализируем телефонный инпут, если он пришел через Ajax
        phoneInput();
      },
    },
  });
}
