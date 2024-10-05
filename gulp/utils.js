import fs from 'fs';
import { src, dest } from 'gulp';
import rename from 'gulp-rename';
import path from 'path';

function fileExist(filePath) {
  try {
    fs.statSync(filePath);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }

  return true;
}

function getBlocksList(source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && fileExist(`${source}${dirent.name}/preview.jpg`))
    .map((dirent) => ({
      image: `./assets/images/dev/blocks/${dirent.name}.jpg`,
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
      blocks: getBlocksList('src/blocks/'),
      sprite: getSpriteList('src/ui/icon/sprite'),
      spriteSize: getSpriteFileSize('src/ui/icon/sprite.svg'),
    },
  };

  fs.writeFile('src/data/ui-kit.json', JSON.stringify(data), (err) => {
    if (err) console.log('error', err);
  });
}

export function generateUiKit() {
  generateUiKitJSON();

  return src(['src/blocks/**/preview.jpg'], { encoding: false })
    .pipe(rename((file) => ({
      dirname: path.dirname(file.dirname),
      basename: file.dirname,
      extname: file.extname,
    })))
    .pipe(dest('build/assets/images/dev/blocks'));
}
