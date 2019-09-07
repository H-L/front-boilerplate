const {task, parallel, watch} = require('gulp');

const sass = require('./gulp-tasks/gulpfile.sass.js');
const config = require('./gulpfile.config.json');

task('default', parallel(
  sass.task
));

task('watch', () => {
  watch(config.styles.srcAll, sass.task);
});

task('build', parallel(
  sass.build
));