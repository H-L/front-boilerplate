var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var sourcemaps  = require('gulp-sourcemaps');
var plumber     = require('gulp-plumber'); 
var babel       = require('gulp-babel');

gulp.task('scripts', function () {
    gulp.src('app/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist/js'))
        .pipe(browserSync.reload({stream: true}));
});
