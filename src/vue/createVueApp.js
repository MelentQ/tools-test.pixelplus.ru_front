import { createApp } from 'vue/dist/vue.runtime.esm-bundler';
import PrimeVue from 'primevue/config';
import primeVueConfig from '@/vue/ui/primeVueConfig';

export default function createVueApp({ containerId, rootApp }) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Контейнер для приложения ${containerId} не найден.`);
    return;
  }

  try {
    const initialProps = JSON.parse(container.getAttribute('data-props'));

    createApp(
      rootApp || {},
      initialProps || null,
    )
      .use(PrimeVue, primeVueConfig)
      .mount(container);
  } catch (e) {
    console.warn(e.message);
  }
}
