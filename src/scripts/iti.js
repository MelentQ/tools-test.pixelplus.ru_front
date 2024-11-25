// https://github.com/jackocnr/intl-tel-input
document.addEventListener('DOMContentLoaded', () => {
  if (window.pts) {
    window.pts.iti = {
      initialCountry: 'ru',
      // onlyCountries: ['ru', 'by', 'ua', 'kz'],
      countryOrder: ['ru', 'by', 'ua', 'kz'],
      excludeCountries: [],
    };
  }
});
