import 'parsleyjs/dist/parsley.min';
import './ru';

export default function $validation() {
  const forms = [...document.querySelectorAll('form.js-validation:not(.--validation-initialized)')];
  forms.map((form) => {
    const selects = form.querySelectorAll('select');

    selects.forEach((select) => {
      select.addEventListener('change', () => {
        $(select).parsley().validate();
      });
    });

    const instance = $(form).parsley({
      focus: 'none',
      errorClass: '--error',
      successClass: '--success',
      classHandler: (field) => field.$element.closest('.js-validation-wrapper'),
      errorsContainer: (field) => field.$element.closest('.js-validation-wrapper'),
      errorsWrapper: '<ul class="errors"></ul>',
      errorTemplate: '<li class="errors__item"></li>',
    });

    form.addEventListener('reset', () => {
      instance.reset();
    });

    form.classList.add('--validation-initialized');

    return instance;
  });
}
