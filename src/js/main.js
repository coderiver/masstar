var Menu             = require('./modules/menu.js');
var Slider           = require('./modules/slider.js');
var Accordion        = require('./modules/accordion.js');
var Popup            = require('./modules/popup.js');
var Anchor           = require('./modules/anchor.js');
var formErrorHandler = require('./modules/form-error-handler.js');

$(document).ready(function() {

    var menu          = $('.menu:not(.menu_opened):not(.menu_catalog)');
    var slider        = $('.slider:not(.slider_narrow)');
    var sliderNarrow  = $('.slider.slider_narrow');
    var popupSlider   = $('.popup-slider');
    var menuOpened    = $('.menu.menu_opened');
    var containerMore = $('.container-more');
    var largeSlider   = $('.large-slider');
    var accordion     = $('.accordion');
    var parallax      = $('.parallax');
    var anchor        = new Anchor('.scroll-to-top');
    var popup         = new Popup();
    var orderForm     = $('#order-form');
    var callbackForm  = $('#callback-form');

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

    if (largeSlider.length) {
        largeSlider.find('.large-slider__slides').slick({
            prevArrow: largeSlider.find('.large-slider__prev'),
            nextArrow: largeSlider.find('.large-slider__next'),
            slide: '.large-slide',
            autoplay: true,
            autoplySpeed: 7000
        });
    }

    if (popupSlider.length) {
        popupSlider.each(function(index, el) {
            var $el = $(el);
            $el.find('.popup-slider__slides').slick({
                prevArrow: $el.find('.popup-slider__prev'),
                nextArrow: $el.find('.popup-slider__next'),
                autoplay: false
            });
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

    $('.js-box').fancybox({
        padding: 0,
        margin: [40, 60, 20, 60],
        nextEffect: 'fade',
        prevEffect: 'fade',
        openSpeed: 500,
        closeSpeed: 300,
        prevSpeed: 300,
        nextSpeed: 300,
        helpers: {
            overlay: {
                locked: false,
                css: {
                    background: 'rgba(12, 65, 158, 0.9)'
                }
            },
        },
        tpl: {
            closeBtn: '<a title="Закрыть" class="fancybox-item popup__close" href="javascript:;">Закрыть</a>',
            next: '<a title="Следующий" class="fancybox-nav popup-slider__next ico ico-slider-next" href="javascript:;"><span></span></a>',
            prev: '<a title="Предыдущий" class="fancybox-nav popup-slider__prev ico ico-slider-prev" href="javascript:;"><span></span></a>'
        },
        afterShow: function() {
            var _ = this;
            _.outer.swipe({
                allowPageScroll: 'auto',
                swipeLeft: function() {
                    $.fancybox.prev();
                },

                swipeRight: function() {
                    $.fancybox.next();
                }
            });
        },

        beforeClose: function() {
            this.skin.addClass('is-close');
        }
    });

    if (accordion.length) {
        accordion.each(function(index, el) {
            new Accordion(el);
        });
    }

    $('[data-popup]').each(function() {
        var $this = $(this);
        $this.on('click', function(e) {
            popup.open($this.data('popup'));
            return false;
        });
    });

    var validationOptions = {
        debug: true,
        rules: {
            phone: {
                minlength: 7
            }
        },
        errorPlacement: function(error, element) {
            return true;
        }
    };

    // order form validation
    if (orderForm.length) {
        orderForm.validate(validationOptions);
    }

    // callback form validation
    if (callbackForm.length) {
        callbackForm.validate(validationOptions);
    }

});
