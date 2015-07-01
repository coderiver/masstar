var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
  gulp.watch(config.src.sass + '/**/*', ['sass']);
  gulp.watch(config.src.jade + '/**/[^_]*.jade', ['jade']);
  gulp.watch(config.src.jade + '/**/_*.jade', ['jade-all']);
  gulp.watch(config.src.svg + '/icons/*.svg', ['svg-sprite']);
  gulp.watch(config.src.img + '/icons/*.png', ['sprite']);
  gulp.watch(config.src.svg + '/not-optimized/*.svg', ['svgo']);
});
