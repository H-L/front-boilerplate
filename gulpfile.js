const {task, parallel, watch, series} = require('gulp');

const sass = require('./gulp-tasks/gulpfile.sass.js');
const js = require('./gulp-tasks/gulpfile.scripts.js');
const link = require('./gulp-tasks/gulpfile.symlink.js');
const config = require('./gulpfile.config.json');

// Run all  tasks without build or watch options
task('default', parallel(
  sass.task,
  js.task,
  link.task
));

// Set up all your watched files here
task('watch', () => {
  watch(config.styles.srcAll, { ignoreInitial: false }, series(sass.task));
  watch(config.scripts.src, { ignoreInitial: false }, series(js.task));
});

// Optimize building by removing sourcemaps, etc
task('build', parallel(
  sass.build,
  js.build
));