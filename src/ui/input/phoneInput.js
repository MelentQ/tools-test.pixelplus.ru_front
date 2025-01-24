import intlTelInput from 'intl-tel-input';
import ru from 'intl-tel-input/i18n/ru';

export default function phoneInput() {
  if (!window.pts || !window.pts.iti) {
    return;
  }

  const options = {
    i18n: ru,
    geoIpLookup: true,
    strictMode: true,
    separateDialCode: true,
    useFullscreenPopup: false,
    ...window.pts.iti,
  };

  const inputs = [...document.querySelectorAll('.js-phone-input:not(.--initialized)')];

  if (!window.pts.phoneInputs) {
    window.pts.phoneInputs = [];
  }

  window.pts.phoneInputs = window.pts.phoneInputs.concat(inputs.map((input) => {
    const instance = intlTelInput(input, {
      ...options,
      dropdownContainer: input.closest('.modal') || document.body,
    });

    input.addEventListener('open:countrydropdown', () => {
      input.classList.add('--iti-is-open');
      instance.dropdownContent.setAttribute('data-lenis-prevent', '');
    });

    input.addEventListener('close:countrydropdown', () => {
      input.classList.remove('--iti-is-open');
      instance.dropdownContent.setAttribute('data-lenis-prevent', '');
    });

    input.classList.add('--initialized');

    return {
      input,
      instance,
    };
  }));
}

window.Parsley.addValidator('iti', {
  requirementType: 'string',
  validateString(value, requirement, { element }) {
    if (!window.pts.phoneInputs) return true;

    const target = window.pts.phoneInputs.find(({ input }) => input === element);
    return target && target.instance.isValidNumber();
  },
  messages: {
    en: 'Enter a valid phone number',
    ru: 'Введите правильный номер мобильного телефона',
  },
});
