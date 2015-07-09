global.jQuery = global.$ = require('jquery');
require('slick-carousel');
require('../../bower_components/fancybox/source/jquery.fancybox.js');

var Menu      = require('./modules/menu.js');
var Slider    = require('./modules/slider.js');
var Accordion = require('./modules/accordion.js');

$(document).ready(function() {

    var menu          = $('.menu:not(.menu_opened):not(.menu_catalog)');
    var slider        = $('.slider:not(.slider_narrow)');
    var sliderNarrow  = $('.slider.slider_narrow');
    var menuOpened    = $('.menu.menu_opened');
    var containerMore = $('.container-more');
    var largeSlider   = $('.large-slider');
    var accordion     = $('.accordion');

    if (menu.length) {
        menu = new Menu(menu);
    }

    if (menuOpened.length) {
        menuOpened = new Menu(menuOpened, {
            alwaysOpen: true
        });
    }

    if (slider.length) {
        slider.each(function(index, el) {
            new Slider(el);
        });
    }

    if (sliderNarrow.length) {
        sliderNarrow.each(function(index, el) {
            new Slider(el);
        });
    }

    if (containerMore.length) {
        containerMore.each(function(index, el) {
            var button  = $(this).find('.container-more__btn');
            var content = $(this).find('.container-more__content');
            button.on('click', function(e) {
                var text    = button.text();
                var altText = button.attr('data-alt-text');
                e.preventDefault();
                content.slideToggle(400);
                button.text(altText);
                button.attr('data-alt-text', text);
            });
        });
    }

    if (largeSlider.length) {
        largeSlider.find('.large-slider__slides').slick({
            prevArrow: largeSlider.find('.large-slider__prev'),
            nextArrow: largeSlider.find('.large-slider__next'),
            slide: largeSlider.find('.large-slide'),
            autoplay: true,
            autoplySpeed: 7000
        });
    }

    $('.js-box').fancybox({
        helpers: {
            overlay: {
                locked: false
            },
        },
    });

    if (accordion.length) {
        accordion.each(function(index, el) {
            new Accordion(el);
        });
    }
});
