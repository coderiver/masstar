var gulp    = require('gulp');
var jade    = require('gulp-jade');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var config  = require('../config');

gulp.task('jade', function() {
  return gulp.src(config.src.jade + '/[^_]*.jade')
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(changed(config.dest.html, {
      extension: '.html'
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.dest.html));
});
