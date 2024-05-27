const path = require('path');
const { readFileSync } = require('fs');
const {
  src, dest, watch, parallel, series,
} = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const del = require('del');
const header = require('gulp-header');
const scss = require('gulp-sass')(require('sass'));
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const prettyHtml = require('gulp-pretty-html');
const svgSprite = require('gulp-svg-sprite');
const merge = require('gulp-merge-json');
const webpackConfig = require('./webpack.config');

function coreStyles() {
  return src(['src/layout/core.scss'])
    .pipe(scss({
      outputStyle: process.env.MODE === 'production' ? 'compressed' : 'expanded',
      includePaths: ['node_modules/'],
    }))
    .pipe(rename({
      extname: '.min.css',
    }))
    .pipe(dest('build/css'));
}

function additionalStyles() {
  return src(['src/widgets/**/index.scss'])
    .pipe(header(`
      @import "layout/styles/scss-variables";
      @import "layout/styles/mixins";
    `))
    .pipe(scss({
      outputStyle: 'expanded',
      includePaths: ['src/'],
    }))
    .pipe(rename((file) => ({
      dirname: path.dirname(file.dirname),
      basename: file.dirname,
      extname: '.css',
    })))
    .pipe(dest('build/css'));
}

function coreScripts() {
  return src(['src/layout/core.js'])
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest('build/js'));
}

function additionalScripts() {
  return src(['src/widgets/**/index.js'])
    .pipe(rename((file) => ({
      dirname: path.dirname(file.dirname),
      basename: file.dirname,
      extname: '.js',
    })))
    .pipe(dest('build/js'));
}

function sprite() {
  return src(['src/components/icon/sprite/*.svg'])
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
    .pipe(dest('src/components/icon'));
}

function json() {
  return src(['src/**/*.json', '!src/layout/data/data.json'])
    .pipe(merge({
      fileName: 'data.json',
    }))
    .pipe(dest('src/layout/data'));
}

function html() {
  return src(['src/pages/*/index.pug'])
    .pipe(pug({
      basedir: './',
      locals: JSON.parse(readFileSync('src/layout/data/data.json')),
    }))
    .pipe(gulpif(process.env.MODE === 'production', prettyHtml({
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
      dirname: path.dirname(file.dirname),
      basename: file.dirname,
      extname: '.html',
    })))
    .pipe(dest('build'));
}

function assets() {
  return src(['public/**/*'])
    .pipe(dest('build'));
}

function watching() {
  watch(['src/**/*.scss', '!src/widgets/**/*.scss'], coreStyles);
  watch(['src/widgets/**/*.scss'], additionalStyles);
  watch(['src/**/*.js', '!src/widgets/**/*.js'], coreScripts);
  watch(['src/widgets/**/*.js'], additionalScripts);
  watch(['src/components/icon/sprite/*.svg'], sprite);
  watch(['src/**/*.json', '!src/layout/data/data.json'], json);
  watch(['src/**/*.pug', 'src/layout/data/data.json', 'src/components/icon/sprite.svg'], html);
  watch(['public/**/*'], assets);
}

function server() {
  browserSync.init({
    server: {
      baseDir: 'build',
    },
    ui: false,
    watch: true,
  });
}

function clean() {
  return del('build/**/*', { force: true });
}

exports.default = series(
  clean,
  sprite,
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
