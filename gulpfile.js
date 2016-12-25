// ## PLUGINS ##
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({pattern: '*'}); // use 'gulp ls' to get plugins list

// ## PATHS ##
var basePaths = {
  src : 'src/app/',
  dist: './src/dist/',
};

var paths = {
  img:{
    src : basePaths.src + 'img/**/*.{jpg, png, svg, gif}',
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
    src : basePaths.src + 'fonts/**/*',
    dist: basePaths.dist + 'fonts/'
  }
};

// ## CONFIGS
// Easier to use
var reload = plugins.browserSync.reload;

var configs = {
  postCssProcessors: [
    require('autoprefixer'),
    require('postcss-import')
  ],
  cleanCss: {
    options: {
      debug: false
    },
    function: function(details) {
      if(configs.cleanCss.options.debug){
          console.log(details.name + ': ' + details.stats.originalSize);
          console.log(details.name + ': ' + details.stats.minifiedSize);
          console.log(details.name + ': ' + 'reduced by ' + Math.round(details.stats.efficiency*10000)/100 + '%');
          // console.log(details.name + ': ' + details.warnings);
          // console.log(details.name + ': ' + details.errors);
        }
    }
  },
  browserSync: {
    baseDir: './src/dist'
  }
};

// ## TASKS ##
// SASS -> CSS Processing
gulp.task('build-css', function () {
  return gulp.src(paths.styles.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.postcss(configs.postCssProcessors))
    .pipe(plugins.cleanCss(configs.cleanCss.options, configs.cleanCss.function))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(reload({ stream: true }));
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
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(reload({ stream: true }));
});

// Fonts Processing
gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
  .pipe(gulp.dest(paths.fonts.dist));
});

// IMG Processing
gulp.task('img', function () {
  return gulp.src(paths.img.src)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(paths.img.dist));
});

// Logging all gulp & vendor plugins.
gulp.task('ls', function() {
  return plugins.util.log(plugins);
});

// ## WATCH ##
// BrowserSync config
gulp.task('browserSync', function () {
  plugins.browserSync.init({
    server:{
      baseDir: configs.browserSync.baseDir
    }
  });
});

gulp.task('watch', ['browserSync', 'build-css', 'build-js', 'fonts'], function () {
  gulp.watch(paths.styles.src, ['build-css']);
  gulp.watch(paths.scripts.src, ['build-js']);
  gulp.watch(paths.fonts.src, ['fonts']);
});
