var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

// IMG Processing
gulp.task('img', function () {
  return gulp.src('app/img/original/**/*.{jpeg,jpg,png,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'));
});