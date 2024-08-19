import createVueApp from '@/vue/createVueApp';
import App from './App.vue';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    createVueApp({
      containerId: 'ui-example',
      rootApp: App,
    });
  }, 5000)
});
