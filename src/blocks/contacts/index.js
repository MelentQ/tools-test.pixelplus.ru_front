window.addEventListener('load', () => {
  window.pts.utils.form.handleForms({
    selector: '.js-contacts-form',
    onSuccess(response, form) {
      window.pts.Fancybox.close();
      window.pts.Fancybox.show([{ src: '#error-modal' }]);
    },
    onError(response, form) {
      window.pts.Fancybox.close();
      window.pts.Fancybox.show([{ src: '#success-modal' }]);
    },
    isFake: true,
  });
});
