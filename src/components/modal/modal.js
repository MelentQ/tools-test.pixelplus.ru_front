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
    },
  });
}
