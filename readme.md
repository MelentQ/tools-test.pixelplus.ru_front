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
node createWidget
```

## Todo

* CSS `.loader` ломает сайт без JS
* Фокус для интерактивных элементов
* `.animation` не работает для ссылок и кнопок (интро, о компании)

## Страницы

todo

## Используемые библиотеки

* [normalize.css](https://necolas.github.io/normalize.css/)
* [GSAP](https://gsap.com/) - для анимаций
* [Lenis](https://github.com/darkroomengineering/lenis) - плавный скролл на сайте
* [Fancybox](https://fancyapps.com/fancybox/) - модалки и галереи
* [Axios](https://axios-http.com/docs/intro)
* [International Telephone Input](https://github.com/jackocnr/intl-tel-input)
* [Swiper](https://swiperjs.com/swiper-api) - слайдеры (карусели)
* [Parsley.js](https://parsleyjs.org/doc/index.html) - валидация форм, требует `jQuery`

## О сборке

* [Gulp](https://gulpjs.com/)
* [Webpack](https://webpack.js.org/)
* [Pug](https://pugjs.org/api/getting-started.html)
* [SCSS](https://sass-lang.com/)
* [Vue.js](https://vuejs.org/)
* [PrimeVue](https://primevue.org/)

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
