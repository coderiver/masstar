var gulp    = require('gulp');
var jade    = require('gulp-jade');
var plumber = require('gulp-plumber');
var config  = require('../config');

gulp.task('jade-all', function() {
  return gulp.src(config.src.jade + '/[^_]*.jade')
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.dest.html));
});
