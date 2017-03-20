var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

require('require-dir')('./gulp.tasks');

gulp.task('watch', ['scripts', 'sass'],function () { 
  
  browserSync.init([
    './app/dist/css/**/*.css',
    './app/dist/js/**/*.js',
    './app/index.html'
  ], 
  { server: './app' });
  
  gulp.watch('app/scss/**/*.{sass,scss}', ['sass']);
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/**/*.html').on('change', reload);
});