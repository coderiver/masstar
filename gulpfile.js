var gulp       = require('gulp');
var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', {recurse: true});

gulp.task('build', [
  'svg-sprite',
  'sprite',
  'sass',
  'jade-all',
  'browserify'
  ]);

gulp.task('default', [
  'server',
  'watch',
  'watchify'
  ]);
