var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var config      = require('../config');

var props = {
  entries: ['./' + config.src.js + '/main.js'],
  dest: [config.dest.js],
  outputName: 'main.js',
  debug: true
};

gulp.task('browserify', function() {
  return browserify(props)
    .bundle()
    .on('error', config.errorHandler)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.js))
    .pipe(browserSync.reload({stream:true, once: true}));
});
