import {createApp} from 'vue/dist/vue.runtime.esm-bundler';
import PrimeVue from 'primevue/config';
import PixelTools from "@/vue/ui/themes/PixelTools";

export default function createVueApp({containerId, rootApp}) {
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
      .use(PrimeVue, {theme: {preset: PixelTools}})
      .mount(container);
  } catch (e) {
    console.warn(e.message);
  }
}
