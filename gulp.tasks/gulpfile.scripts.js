var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var sourcemaps  = require('gulp-sourcemaps');
var plumber     = require('gulp-plumber');

gulp.task('scripts', function () {
    gulp.src('app/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist/js'))
        .pipe(browserSync.reload({stream: true}));
});
