// https://github.com/jackocnr/intl-tel-input
document.addEventListener('DOMContentLoaded', () => {
  if (window.pts) {
    window.pts.iti = {
      utilsScript: './assets/iti/utils.js',
      initialCountry: 'ru',
      // onlyCountries: ['ru', 'by', 'ua', 'kz'],
      countryOrder: ['ru', 'by', 'ua', 'kz'],
      excludeCountries: [],
    };
  }
});
