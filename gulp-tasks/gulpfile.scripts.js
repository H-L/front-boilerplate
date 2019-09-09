const {src, dest} = require('gulp');
let config = require('../gulpfile.config.json');

let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let plumber = require('gulp-plumber');
let babel = require('gulp-babel');
let gulpif = require('gulp-if');

let scripts = config.scripts;
let presets = config.babelPreset;

const task_js = done => {
  scripts.forEach(script => {
    let source = script.src;
    let destination = script.dist;

    // Set up concat variables
    let concat_bool = false;
    let concat_settings = script.concat;
    // If concat_settings is falsy, concat() still needs to get a string. I know, it's weird.
    if(concat_settings){ 
      concat_bool = true 
    } else {
      concat_bool = false
      concat_settings = "whatever"
    };
    
    src(source, {sourcemaps: true})
      .pipe(plumber())
      .pipe(babel(presets))
      .pipe(uglify())
      .pipe( gulpif(concat_bool, concat(concat_settings)))
      .pipe(dest(destination, {sourcemaps: true}))
    done();
  });
};

const build_js = done => {
  scripts.forEach(script => {
    let source = script.src;
    let destination = script.dist;

    // Set up concat variable. 
    // If concat_settings is falsy, concat() still needs to get a string. I know, it's weird.
    let concat_bool = false;
    let concat_settings = script.concat;
    concat_settings ? concat_bool = true : concat_bool = false;
    concat_settings.toString();

    src(source, {sourcemaps: true})
      .pipe(plumber())
      .pipe(babel(presets))
      .pipe(uglify())
      .pipe(gulpif(concat_bool, concat(concat_settings)))
      .pipe(dest(destination))
    done();
  });
};

module.exports = {
  task: task_js,
  build: build_js
}