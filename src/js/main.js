global.jQuery = global.$ = require('jquery');
require('slick-carousel');

var Menu   = require('./modules/menu.js');
var Slider = require('./modules/slider.js');

$(document).ready(function() {

    var menu       = $('.menu:not(.menu_opened)');
    var slider     = $('.slider');
    var menuOpened = $('.menu.menu_opened');

    if (menu.length) {
        menu = new Menu(menu);
    }

    if (menuOpened.length) {
        menuOpened = new Menu(menuOpened, {
            alwaysOpen: true,
        });
    }

    if (slider.length) {
        slider.each(function(index, el) {
            new Slider(el);
        });
    };

});
