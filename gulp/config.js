module.exports = {
  //** src paths **
  src: {
    root   : 'src',
    jade   : 'src/jade',
    sass   : 'src/sass',
    js     : 'src/js',
    img    : 'src/img',
    svg    : 'src/img/svg',
    helpers: 'src/helpers'
  },

  //** dest paths **
  dest: {
    root   : 'site',
    html   : 'site',
    css    : 'site/css',
    js     : 'site/js',
    img    : 'site/img'
  },

  errorHandler: require('./lib/handle-errors')
};
