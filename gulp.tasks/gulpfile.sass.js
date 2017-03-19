var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps  = require('gulp-sourcemaps');
var postcss     = require('gulp-postcss');
var cleanCss    = require('gulp-clean-css');
var plumber     = require('gulp-plumber');


// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src('app/scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([require('autoprefixer'),]))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist/css'))
        .pipe(browserSync.reload({stream: true}));
});
