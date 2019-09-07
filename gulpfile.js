const {task, parallel, watch, series} = require('gulp');

const sass = require('./gulp-tasks/gulpfile.sass.js');
const js = require('./gulp-tasks/gulpfile.scripts.js');
const config = require('./gulpfile.config.json');

task('default', parallel(
  sass.task,
  js.task
));

task('watch', () => {
  watch(config.styles.srcAll, { ignoreInitial: false }, series(sass.task));
  watch(config.scripts.src, { ignoreInitial: false }, series(js.task));
});

task('build', parallel(
  sass.build,
  js.build
));