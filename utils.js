const fs = require('fs');
const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const path = require('path');

function fileExist(filePath) {
  try {
    fs.statSync(filePath);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }

  return true;
}

function getWidgetsList(source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && fileExist(`${source}${dirent.name}/preview.jpg`))
    .map((dirent) => ({
      image: `./assets/images/dev/widgets/${dirent.name}.jpg`,
      title: dirent.name,
    }));
}

function getSpriteList(source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.name.includes('.svg'))
    .map((dirent) => ({
      name: dirent.name.replace('.svg', ''),
    }));
}

function getSpriteFileSize(source) {
  const stats = fs.statSync(source);
  return stats.size;
}

function generateUiKitJSON() {
  const data = {
    ui: {
      widgets: getWidgetsList('src/widgets/'),
      sprite: getSpriteList('src/components/icon/sprite'),
      spriteSize: getSpriteFileSize('src/components/icon/sprite.svg'),
    },
  };

  fs.writeFile('src/data/ui-kit.json', JSON.stringify(data), (err) => {
    if (err) console.log('error', err);
  });
}

function generateUiKit() {
  generateUiKitJSON();

  return src(['src/widgets/**/preview.jpg'])
    .pipe(rename((file) => ({
      dirname: path.dirname(file.dirname),
      basename: file.dirname,
      extname: file.extname,
    })))
    .pipe(dest('build/assets/images/dev/widgets'));
}

exports.generateUiKit = generateUiKit;
