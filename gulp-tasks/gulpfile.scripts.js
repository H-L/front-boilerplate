const {src, watch, task, series, dest} = require('gulp');
let config = require('../gulpfile.config.json');

let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let plumber = require('gulp-plumber');
let babel = require('gulp-babel');
let livereload = require('gulp-livereload');

let source = config.scripts.src;
let destination = config.scripts.dist;
let presets = config.scripts.babelPreset;
let polyfill = config.scripts.polyfill;
polyfill ? source = [source, ...polyfill] : null;

const task_js = done => {
  src(source, {sourcemaps: true})
    .pipe(plumber())
    .pipe(babel(presets))
    .pipe(uglify())
    .pipe(concat(config.scripts.concat))
    .pipe(dest(destination, {sourcemaps: true}))
  done();
};

const build_js = done => {
  src(source)
    .pipe(plumber())
    .pipe(babel(presets))
    .pipe(uglify())
    .pipe(concat(config.scripts.concat))
    .pipe(dest(destination));
  done();
};

module.exports = {
  task: task_js,
  build: build_js
}