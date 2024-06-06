document.addEventListener('DOMContentLoaded', () => {
  function handleForms() {
    const forms = document.querySelectorAll('.js-form:not(.--handlers-initialized)');
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        form.classList.add('--loading');

        const data = new FormData(form);

        const onSuccess = (response) => {
          form.reset();
          window.pts.Fancybox.close();
          window.pts.Fancybox.show([{ src: '#success-modal' }]);
        };

        const onError = (error) => {
          window.pts.Fancybox.close();
          window.pts.Fancybox.show([{ src: '#error-modal' }]);
        };

        setTimeout(() => {
          window.pts.axios({
            method: form.method,
            url: form.action,
            data,
          })
            .then(onSuccess)
            .catch(onError)
            .finally(() => {
              form.classList.remove('--loading');
            });
        }, 1500);
      });

      form.classList.add('--handlers-initialized');
    });
  }

  handleForms();

  // Нужно для инициализации форм, полученных через Ajax в модалках
  window.pts.handleForms = handleForms;
});
