"use strict";
// ## PLUGINS ##
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({pattern: '*'}); // use 'gulp ls' to get plugins list
var fs = require('fs'); // Related to favicon generation

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
  favicon:{
    src : basePaths.src + 'favicon/*.{png, svg}',
    dist: basePaths.dist + 'favicon/'
  },
  scripts:{
    src : basePaths.src + 'js/**/*.js',
    dist: basePaths.dist + 'js/'
  },
  styles:{
    src : basePaths.src + 'sass/**/*.scss',
    dist: basePaths.dist + 'css/'
  },
  html:{
    src : basePaths.src + '**/*.scss',
    dist: basePaths.dist
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
  },
  realFavicon: {
		masterPicture: 'src/app/favicon/Terminal.png',
		dest: 'src/dist/favicon/',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
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

// HTML Processing
gulp.task('build-html', function () {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dist))
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

gulp.task('watch', ['browserSync', 'build-css', 'build-js', 'build-html'], function () {
  gulp.watch(paths.scripts.src, ['build-js']);
  gulp.watch(paths.html.src, ['build-html']);
  gulp.watch(paths.styles.src, ['build-css']);
});

// ## BUILD ##
gulp.task('build', ['build-css', 'build-js', 'build-html', 'generate-favicon', 'img', 'fonts'], function () { 

});

// Favicon Processing
// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	plugins.realFavicon.generateFavicon(configs.realFavicon, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src([ 'TODO: List of the HTML files where to inject favicon markups' ])
		.pipe(plugins.realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	plugins.realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});
