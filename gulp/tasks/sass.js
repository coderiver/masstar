var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var config       = require('../config');

gulp.task('sass', function() {
  var processors = [
    autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    })
  ];

  return sass(config.src.sass, {
      sourcemap: true,
      style: 'compact'
    })
    .on('error', config.errorHandler)
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css));
});
