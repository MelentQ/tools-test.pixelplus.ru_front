export default function handleForms({
  selector, onSuccess, onError, onComplete, isFake,
}) {
  const forms = document.querySelectorAll(`${selector}:not(.--handlers-initialized)`);
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      form.classList.add('--loading');

      const data = new FormData(form);

      const send = () => {
        window.pts.axios({
          method: form.method,
          url: form.action,
          data,
        })
          .then(((response) => {
            if (onSuccess) {
              onSuccess(response, form);
            }
          }))
          .catch((response) => {
            if (onError) {
              onError(response, form);
            }
          })
          .finally(() => {
            form.classList.remove('--loading');
            if (onComplete) {
              onComplete(form);
            }
          });
      };

      if (isFake) {
        setTimeout(send, 1500);
      } else {
        send();
      }
    });

    form.classList.add('--handlers-initialized');
  });
}
