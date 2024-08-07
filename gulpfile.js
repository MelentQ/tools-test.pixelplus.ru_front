const path = require('path');
const { readFileSync } = require('fs');
const {
  src, dest, watch, parallel, series,
} = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const del = require('del');
const header = require('@fomantic/gulp-header');
const scss = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const data = require('gulp-data');
const prettyHtml = require('gulp-pretty-html');
const svgSprite = require('gulp-svg-sprite');
const merge = require('gulp-merge-json');
const webpackConfig = require('./webpack.config');
const devConfig = require('./dev-config');
const { generateUiKit } = require('./utils');

function coreStyles() {
  return src(['src/layout/core.scss'], { encoding: false })
    .pipe(sassGlob())
    .pipe(scss({
      outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded',
      includePaths: ['node_modules/'],
    }))
    .pipe(rename({
      extname: '.min.css',
    }))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
}

function additionalStyles() {
  return src(['src/blocks/**/index.scss'], { encoding: false })
    .pipe(header(`
      @import "layout/styles/scss-variables";
      @import "layout/styles/mixins";
    `))
    .pipe(scss({
      outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded',
      includePaths: ['src/'],
    }))
    .pipe(rename((file) => ({
      dirname: '.',
      basename: file.dirname,
      extname: '.min.css',
    })))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
}

function coreScripts() {
  return src(['src/layout/core.js'], { encoding: false })
    .pipe(named((file) => path.basename('core', path.extname(file.path))))
    .pipe(webpack(webpackConfig))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
}

function additionalScripts() {
  const scripts = process.env.NODE_ENV === 'production'
    ? ['src/blocks/*/index.js', 'src/vue/apps/*/index.js']
    : ['src/blocks/*/index.js', ...devConfig.scripts];

  return src(scripts, { base: process.cwd(), encoding: false })
    .pipe(named((file) => path.basename(file.dirname.split('\\').slice(-1)[0], path.extname(file.path))))
    .pipe(webpack(webpackConfig))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
}

function sprite() {
  return src(['src/ui/icon/sprite/*.svg'], { encoding: false })
    .pipe(svgSprite({
      mode: {
        inline: true,
        symbol: {
          sprite: '../sprite.svg',
        },
      },
      transform: [{
        svgo: {
          plugins: [
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false },
            { cleanupIDs: false },
            { mergePaths: false },
            { removeUnknownsAndDefaults: false }],
        },
      }],
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceIDs: false,
      },
    }))
    .pipe(dest('src/ui/icon'));
}

function json() {
  return src(['src/**/*.json', '!src/layout/data/data.json'], { encoding: false })
    .pipe(merge({
      fileName: 'data.json',
    }))
    .pipe(dest('src/layout/data'));
}

function html() {
  const pages = process.env.NODE_ENV === 'production'
    ? ['src/pages/**/index.pug']
    : devConfig.pages;

  return src(pages, { base: process.cwd(), encoding: false })
    .pipe(data((file) => {
      try {
        return JSON.parse(readFileSync(`${file.path}.json`));
      } catch (err) {
        return null;
      }
    }))
    .pipe(pug({
      basedir: './',
      locals: {
        system: {
          env: process.env.NODE_ENV || 'development',
        },
        ...JSON.parse(readFileSync('src/layout/data/data.json')),
      },
    }))
    .pipe(gulpif(process.env.NODE_ENV === 'production', prettyHtml({
      indent_size: 4,
      indent_char: ' ',
      indent_inner_html: true,
      unformatted: [],
      content_unformatted: [],
      wrap_line_length: 0,
      inline: [],
      extra_liners: ['header', 'main', 'footer', '/body'],
    })))
    .pipe(rename((file) => ({
      dirname: '.',
      basename: file.dirname.split('\\').slice(-1)[0],
      extname: file.extname,
    })))
    .pipe(dest('build'));
}

function assets() {
  return src(['public/**/*'], { encoding: false })
    .pipe(dest('build'));
}

function watching() {
  watch(['src/**/*.scss', '!src/blocks/**/*.scss'], coreStyles);
  watch(['src/blocks/**/*.scss'], additionalStyles);
  watch(['src/**/*.js', '!src/blocks/**/*.js'], coreScripts);
  watch(['src/blocks/**/*.js', 'src/vue/**/*.js', 'src/vue/**/*.vue'], additionalScripts);
  watch(['src/ui/icon/sprite/*.svg'], sprite);
  watch(['src/**/*.json', '!src/layout/data/data.json'], json);
  watch(['src/**/*.pug', 'src/layout/data/data.json', 'src/ui/icon/sprite.svg'], html);
  watch(['public/**/*'], assets);
  watch(['build/*.html']).on('change', browserSync.reload);
}

function server() {
  browserSync.init({
    server: {
      baseDir: 'build',
    },
    ui: false,
  });
}

function clean() {
  return del('build/**/*', { force: true });
}

exports.default = series(
  clean,
  sprite,
  generateUiKit,
  json,
  parallel(
    assets,
    coreStyles,
    additionalStyles,
    coreScripts,
    additionalScripts,
    html,
  ),
  parallel(
    watching,
    server,
  ),
);

exports.build = series(
  clean,
  sprite,
  generateUiKit,
  json,
  parallel(
    assets,
    coreStyles,
    additionalStyles,
    coreScripts,
    additionalScripts,
    html,
  ),
);
