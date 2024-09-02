# Frontend сайта tools.pixelplus.ru

Небольшой мануал для тех, кто будет с этим работать

## Установка

Установить Node JS версии 18 и больше, затем выполнить команду:

```bash
npm install
```

## Использование

Режим разработки:

```bash
npm run dev
```

> ⚠️ Сборка работает медленно, поэтому в режиме разработки собираются только указанные в файле `./dev-config.js` страницы

Собрать проект:

```bash
npm run build
```

Создать шаблон блока в директории `src/blocks`

```bash
node createBlock [название блока]
```

## Todo

* CSS `.loader` ломает сайт без JS
* Фокус для интерактивных элементов
* `.animation` не работает для ссылок и кнопок (интро, о компании)
* Доделать стили для селекта (select.scss)
* Переписать переменные bootstrap для цветов
* Боковое меню в ui-kit
* Вернуть тени в карточки, селекты и тд
* Добавить иконку поиска в селект
* Темная тема в chrome сломанная
* HTML Editor - не забыть про изображения
* Страница после успешной регистрации
* Библиотека для анимаций
* Видео ВК

## Страницы

todo

## Используемые библиотеки

* [normalize.css](https://necolas.github.io/normalize.css/)
* [Bootstrap.css](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - Только лейаут
* [GSAP](https://gsap.com/) - для анимаций
* [Lenis](https://github.com/darkroomengineering/lenis) - плавный скролл на сайте
* [Fancybox](https://fancyapps.com/fancybox/) - модалки и галереи
* [Axios](https://axios-http.com/docs/intro)
* [JS Cookie](https://github.com/js-cookie/js-cookie#readme)
* [International Telephone Input](https://github.com/jackocnr/intl-tel-input)
* [Swiper](https://swiperjs.com/swiper-api) - слайдеры (карусели)
* [jQuery 3.7.1](https://api.jquery.com/) - желательно не использовать просто так
* [Parsley.js](https://parsleyjs.org/doc/index.html) - валидация форм, требует `jQuery`
* [Prism.js](https://prismjs.com/) - code-highlighter
* [Vue.js](https://vuejs.org/) - Vue 3 Composition Api
* [PrimeVue](https://primevue.org/) - UI-kit для Vue

## О сборщике

* [Gulp 5](https://gulpjs.com/)
* [Webpack](https://webpack.js.org/)
* [Pug](https://pugjs.org/api/getting-started.html)
* [SCSS](https://sass-lang.com/)

Не забудь включить линтеры в своём IDE

* stylelint
* eslint
* editorconfig

## Структура проекта

* `src` - исходники
  * `src/blocks` - готовые секции, из которых собираются страницы. Для них css и js собирается отдельно
  * `src/data` - данные в формате json, доступны глобально во всех компонентах
  * `src/layout` - общий код, общие стили, js и лейаут. Отсюда собирается `core.min.js` и `core.min.css`
  * `src/pages` - страницы сайта
  * `src/ui` - переиспользуемые компоненты, ui-kit - неотъемлемая часть сайта (core)
  * `src/vue` - todo
    * `src/vue/apps` - todo
    * `src/vue/ui` - todo
* `public` - файлы, которые нужно просто перенести в билд в исходном виде
* `build` - собранный проект для бекенда

## Детали

### JS

#### core.js

Файл `core.min.js` собирается из `src/layout/core.js`.
В него попадает весь общий код для сайта, например модалки, селекты, валидация и т.д.

#### JS для секций сайта

Если JS относится к конкретной секции (блоку), то его следует помещать в директорию секции, например `src/blocks/demo-form/index.js`.
Такие файлы поддерживают модульный JS и минифицируются.
Желательно пользоваться глобальными переменными из core.js, вынесенными в общий объект `window.pts`.
Если пользоваться импортами, то файлы блоков будут иметь огромный размер.

#### Vue.js

todo

## Какие-то правила

* Все связанные с JS классы должно начинаться на `js-`
* Не использовать id, исключение - модалки
* Модалки должны заканчиваться на `-modal`
* Вёрстка в `rem`-ах, исключение - `1px`
* CSS БЭМ, разделитель для модификаторов `--`
* Размер иконок в спрайте - 24 на 24
* todo
