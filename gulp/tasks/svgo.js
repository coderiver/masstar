var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var svgmin  = require('gulp-svgmin');
var config  = require('../config');

gulp.task('svgo', function() {
  return gulp.src(config.src.svg + '/not-optimized/*.svg')
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      },
      plugins: [{
        removeDesc: true
      }, {
        cleanupIDs: true
      }, {
        mergePaths: false
      }]
    }))
    .pipe(gulp.dest(config.src.svg + '/optimized'));
});
