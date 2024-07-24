import handleForms from '@/components/form/handleForms';

window.addEventListener('load', () => {
  handleForms({
    selector: '.js-onboarding-form',
    onSuccess(response, form) {
      window.pts.Fancybox.close();
      window.pts.Fancybox.show([{ src: '#error-modal' }]);
    },
    onError(response, form) {
      window.pts.Fancybox.close();
      window.pts.Fancybox.show([{ src: '#error-modal' }]);
    },
    isFake: true,
  });
});
