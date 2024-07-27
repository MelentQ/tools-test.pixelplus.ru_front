window.addEventListener('load', () => {
  window.pts.utils.form.handleForms({
    selector: '.js-reset-password-form',
    onSuccess(response, form) {
      window.pts.Fancybox.show([{ src: '#error-modal' }]);
    },
    onError(response, form) {
      window.pts.Fancybox.show([{ src: '#reset-password-success-modal' }]);
    },
    isFake: true,
  });
});
