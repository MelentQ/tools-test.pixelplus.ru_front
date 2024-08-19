import { createApp } from 'vue/dist/vue.runtime.esm-bundler';
import PrimeVue from 'primevue/config';
import primeVueConfig from '@/vue/ui/primeVueConfig';

export default function createVueApp({ containerId, rootApp }) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Контейнер для приложения ${containerId} не найден.`);
    return;
  }
  
  const dataProps = container.getAttribute('data-props');
  let initialProps = null;

  if (dataProps) {
    try {
      initialProps = JSON.parse(dataProps);
    } catch (e) {
      console.warn(e.message);
    }
  }

  createApp(
    rootApp || {},
    initialProps,
  )
    .use(PrimeVue, primeVueConfig)
    .mount(container);
}
