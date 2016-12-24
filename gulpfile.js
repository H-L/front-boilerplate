// ## PATHS ##
var basePaths = {
  src : 'src/app/',
  dist: './src/dist/',
};

var paths = {
  img:{
    src : basePaths.src + 'img/**/*.{png, svg, jpg}',
    dist: basePaths.dist + 'img-min/'
  },
  scripts:{
    src : basePaths.src + 'js/**/*.js',
    dist: basePaths.dist + 'js/'
  },
  styles:{
    src : basePaths.src + 'sass/**/*.scss',
    dist: basePaths.dist + 'css/'
  },
  fonts:{
    src : basePaths.src + 'fonts/',
    dist: basePaths.dist + 'fonts/'
  }
};

// ## PLUGINS ##
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({pattern: '*'}); // e.g. gulp-strip-debug => plugins.stripDebug

// ## TASKS ##
// SASS -> CSS Processing
gulp.task('build-css', function () {
  return gulp.src(paths.styles.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.postcss([require('autoprefixer'), require('postcss-import')]))
    .pipe(plugins.cleanCss())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dist));
});

// JS Processing
gulp.task('build-js', function () {
  return gulp.src(paths.scripts.src)
    .pipe(plugins.sourcemaps.init())
    // Checking environnement output.
    .pipe(plugins.babel())
    .pipe(plugins.util.env.prod === true ? plugins.uglify() : plugins.util.noop())
    .pipe(plugins.concat('all.js'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dist));
});

// IMG Processing
gulp.task('img', function () {
  return gulp.src(paths.img.src)
    .pipe(aGulpPlugin())
    .pipe(gulp.dest(paths.img.dist));
});

// Fonts Processing
gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist));
});

// Logging all gulp & vendor plugins.
gulp.task('ls', function() {
  return plugins.util.log(plugins);
});

// // Testing --prod flag
// gulp.task('default', function () {
//   console.log('Production mode : ' + !!plugins.util.env.prod);
// });
