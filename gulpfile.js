import path from 'path';
import { readFileSync } from 'fs';
import {
  src, dest, watch, parallel, series,
} from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import { deleteAsync as del } from 'del';
import header from '@fomantic/gulp-header';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import postcss from 'gulp-postcss';
import sortMediaQueries from 'postcss-sort-media-queries';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import pug from 'gulp-pug';
import data from 'gulp-data';
import prettyHtml from 'gulp-pretty-html';
import svgSprite from 'gulp-svg-sprite';
import merge from 'gulp-merge-json';
import webpackConfig from './webpack.config.js';
import config from './gulp/config.js';
import { generateUiKit } from './gulp/utils.js';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

function coreStyles() {
  return src(['src/styles/index.scss'], { encoding: false })
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['node_modules/'],
    }, null))
    .pipe(gulpif(process.env.NODE_ENV === 'production', postcss([
      sortMediaQueries({
        sort: 'desktop-first',
      }),
      autoprefixer(),
      cssnano({
        preset: 'default',
      }),
    ])))
    .pipe(rename({
      basename: 'core',
      extname: '.min.css',
    }))
    .pipe(dest('build/css'))
    .pipe(bs.stream());
}

function additionalStyles() {
  return src(['src/blocks/**/index.scss'], { encoding: false })
    .pipe(header(`
      @import "styles/breakpoints";
      @import "styles/mixins";
    `))
    .pipe(sass({
      includePaths: ['src/'],
    }, null))
    .pipe(gulpif(process.env.NODE_ENV === 'production', postcss([
      sortMediaQueries({
        sort: 'desktop-first',
      }),
      autoprefixer(),
      cssnano({
        preset: 'default',
      }),
    ])))
    .pipe(rename((file) => ({
      dirname: '.',
      basename: file.dirname,
      extname: '.min.css',
    })))
    .pipe(dest('build/css'))
    .pipe(bs.stream());
}

function coreScripts() {
  return src(['src/scripts/index.js'], { encoding: false })
    .pipe(named((file) => path.basename('core', path.extname(file.path))))
    .pipe(webpack(webpackConfig))
    .pipe(dest('build/js'))
    .pipe(bs.stream());
}

function additionalScripts() {
  const scripts = process.env.NODE_ENV === 'production'
    ? ['src/blocks/*/index.js', 'src/vue/apps/**/index.js']
    : ['src/blocks/*/index.js', ...config.scripts];

  return src(scripts, { base: process.cwd(), encoding: false })
    .pipe(named((file) => path.basename(file.dirname.split('\\').slice(-1)[0], path.extname(file.path))))
    .pipe(webpack(webpackConfig))
    .pipe(dest('build/js'))
    .pipe(bs.stream());
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
  return src(['src/**/*.json', '!src/data/data.json', '!src/pages/**/*.json'], { encoding: false })
    .pipe(merge({
      fileName: 'data.json',
    }))
    .pipe(dest('src/data'));
}

function html() {
  const pages = process.env.NODE_ENV === 'production'
    ? ['src/pages/**/index.pug']
    : config.pages;

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
      filters: { raw: (text) => text },
      locals: {
        system: {
          env: process.env.NODE_ENV || 'development',
        },
        ...JSON.parse(readFileSync('src/data/data.json')),
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
  watch(['src/**/*.json', '!src/data/data.json'], json);
  watch(['src/**/*.pug', 'src/pages/**/*.pug', 'src/data/data.json', 'src/pages/**/*.json', 'src/ui/icon/sprite.svg'], html);
  watch(['public/**/*'], assets);
  watch(['build/*.html']).on('change', bs.reload);
}

function server() {
  bs.init({
    ui: false,
    server: {
      baseDir: 'build',
    },
    timestamps: false,
  });
}

function clean() {
  return del('build/**/*', { force: true });
}

export const build = series(
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

export default series(
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
