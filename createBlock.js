// Генератор заготовок для виджетов
// Использование: node createWidget.js [имя виджета]

const fs = require('fs');
const { mkdirp } = require('mkdirp');

function fileExist(path) {
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }

  return true;
}

const name = process.argv[2];

if (name) {
  const dirName = `src/blocks/${name}/`;
  const files = [
    {
      name: 'index.pug',
      content: `include ${name}\n`,
    },
    {
      name: `${name}.pug`,
      content: `mixin ${name}(props)
  - props = props || {}
  .${name}
  link(href="./css/${name}.min.css" rel="stylesheet")
  script(src="./js/${name}.min.js" defer="")\n`,
    },
    {
      name: 'index.scss',
      content: `@import "${name}";\n`,
    },
    {
      name: `${name}.scss`,
      content: `.${name} {}\n`,
    },
    {
      name: 'index.js',
      content: `document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-${name}:not(.--initialized)');
  containers.forEach((container) => {
    container.classList.add('--initialized');
  });
});\n`,
    },
  ];

  const dir = mkdirp.sync(dirName);
  console.log(`[NTH] Создание папки: ${dir}`);

  files.forEach((file) => {
    const path = dirName + file.name;

    if (fileExist(path)) {
      console.warn(`Файл НЕ создан: ${path} (уже существует`);
    } else {
      fs.writeFile(path, file.content, (err) => {
        if (err) {
          console.warn(`Файл НЕ создан: ${err}`);
        }
        console.log(`Файл создан: ${path}`);
      });
    }
  });

  console.log(`Не забудь добавить 'include ${name}/index' в файл 'src/blocks/index.pug'`);
  console.log(`Не забудь создать превью виджета 'preview.jpg' в директорию 'src/blocks/${name}/'`);
} else {
  console.warn('Необходимо указать название виджета');
}
