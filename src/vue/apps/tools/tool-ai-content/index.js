import createVueApp from '@/vue/createVueApp';
import App from './App.vue';

document.addEventListener('DOMContentLoaded', () => {
  createVueApp({
    containerId: 'tool-ai-content',
    rootApp: App,
  });
});
