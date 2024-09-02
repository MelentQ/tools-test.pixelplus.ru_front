import createVueApp from '@/vue/createVueApp';
import App from './App.vue';

document.addEventListener('DOMContentLoaded', () => {
  createVueApp({
    containerId: 'ui-compare',
    rootApp: App,
  });
});
