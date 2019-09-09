/**
 * Create Symbolic link for static files like fonts or images.
 * 
 * Symply add an object to "static_assets" array with:
 * {
 *  src: /path/to/source
 *  dest: /path/to/dest
 * }
 */
const {src, symlink} = require('gulp');
let config = require('../gulpfile.config.json');

let static_assets = config.static_assets;

const link = (done) => {
  static_assets.forEach(asset => {
    src(asset.src)
      .pipe(symlink(asset.dest))
  });
  done();
};

module.exports = {
  task: link
}