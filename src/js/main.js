global.jQuery = global.$ = require('jquery');

var Menu = require('./modules/menu.js');

$(document).ready(function() {

    console.log('Hello World!');

    var menu = new Menu('.menu');

});
