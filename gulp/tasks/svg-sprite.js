var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var svgmin    = require('gulp-svgmin');
var svgSprite = require('gulp-svg-sprites');
var cheerio   = require('gulp-cheerio');
var config    = require('../config');

gulp.task('svg-sprite', function() {
  return gulp.src(config.src.svg + '/icons/*.svg')
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
    .pipe(cheerio({
      run: function($, file) {
        $('[fill]:not([fill="currentColor"])').removeAttr('fill');
      },

      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgSprite({
      mode: 'symbols',
      selector: 'icon-%f',
      preview: false,
      svg: {
        symbols: 'icons.svg'
      }
      // templates: {
      //     css: require('fs').readFileSync('sass/lib/sprite-template.scss', "utf-8")
      // },
      // cssFile: '../sass/_svg-sprite.sass',
      // svgPath: '../img/sprites/%f',
      // pngPath: '../img/sprites/%f',
      // padding: 10
    }))
    .pipe(gulp.dest(config.dest.img));
});
