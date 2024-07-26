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

Создать шаблон блока в директории `src/widgets`

```bash
node createWidget
```

## Todo

* CSS `.loader` ломает сайт без JS
* В виджетах отказаться от импортов, так как они сильно увеличивают вес файлов

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

* Gulp 4
* Webpack
* Pug
* SCSS

Не забудь включить линтеры в своём IDE

* stylelint
* eslint
* editorconfig

## Структура проекта

* `src` - исходники
  * `src/components` - переиспользуемые компоненты, ui-kit - неотъемлемая часть сайта (core)
  * `src/data` - данные в формате json, доступны глобально во всех компонентах
  * `src/layout` - общий код, общие стили, js и лейаут. Отсюда собирается `core.min.js` и `core.min.css`
  * `src/pages` - страницы сайта
  * `src/widgets` - готовые секции, из которых собираются страницы. Для них css и js собирается отдельно
* `public` - файлы, которые нужно просто перенести в билд в исходном виде
* `build` - собранный проект для бекенда
