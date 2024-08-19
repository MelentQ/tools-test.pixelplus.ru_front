document.addEventListener('DOMContentLoaded', () => {
  const isWelcomeMessageDisabled = window.pts.Cookie.get('is-welcome-message-disabled');

  if (!isWelcomeMessageDisabled) {
    window.pts.Fancybox.close();
    window.pts.Fancybox.show([{ src: '#welcome-message-modal' }]);
    window.pts.Cookie.set('is-welcome-message-disabled', '1');
  }
});
