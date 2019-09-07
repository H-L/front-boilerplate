const {src, dest, lastRun} = require('gulp');
let config = require('../gulpfile.config.json');

// Plugins
let sassGlob = require('gulp-sass-glob');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let cleanCss = require('gulp-clean-css');
let concat = require('gulp-concat');
let plumber = require('gulp-plumber');
let livereload = require('gulp-livereload');
let tildeImporter = require('node-sass-tilde-importer');

// Config vars
let source = config.styles.src;
let destination = config.styles.dist;

// Methods
const task_sass = done => {
  src(source, {sourcemaps: true})
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        importer: tildeImporter,
        outputStyle: 'compressed'
      })
        .on('error', sass.logError)
    )
    .pipe(postcss([
      require('autoprefixer'), 
      require('postcss-object-fit-images')
    ]))
    .pipe(cleanCss())
    .pipe(concat(config.styles.concat))
    .pipe(dest(destination, {sourcemaps: true}))
    .pipe(livereload());
  done();
};

const build_sass = done => {
  src(source)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        importer: tildeImporter,
        outputStyle: 'compressed'
      })
        .on('error', sass.logError)
    )
    .pipe(postcss([require('autoprefixer'), require('postcss-object-fit-images')]))
    .pipe(cleanCss())
    .pipe(concat(config.styles.concat))
    .pipe(dest(destination));
  done();
};

module.exports = {
  task: task_sass,
  build: build_sass
}