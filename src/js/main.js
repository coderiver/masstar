global.jQuery = global.$ = require('jquery');
require('slick-carousel');

var Menu   = require('./modules/menu.js');
var Slider = require('./modules/slider.js');

$(document).ready(function() {

    var menu, slider;

    menu = new Menu('.menu');

    slider = $('.slider');
    if (slider.length) {
        slider.each(function(index, el) {
            new Slider(el);
        });
    };

});
