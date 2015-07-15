(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./modules/accordion.js":2,"./modules/anchor.js":3,"./modules/form-error-handler.js":4,"./modules/menu.js":5,"./modules/popup.js":6,"./modules/slider.js":7}],2:[function(require,module,exports){
function Accordion(element, config) {

    this.options = {
        item: '.accordion__item',
        btn: '.accordion__btn',
        content: '.accordion__content',
        activeClass: 'is-active',
        speed: 300
    };

    $.extend(this.options, config || {});

    this.$el      = element instanceof jQuery ? element : $(element);
    this.$item    = this.$el.find(this.options.item);
    this.$btn     = this.$el.find(this.options.btn);

    this.init();

}

Accordion.prototype = {

    constructor: Accordion,

    _initEvents: function() {
        var _ = this;

        _.$btn.on('click', function(e) {
            var btn   = $(this);
            var index = btn.index();
            var content = btn.siblings(_.options.content);
            e.preventDefault();
            btn.toggleClass(_.options.activeClass);
            content.slideToggle(_.options.speed);
        });
    },

    init: function() {
        this._initEvents();
    }

};

module.exports = Accordion;

},{}],3:[function(require,module,exports){
function Anchor(element, config) {

    var _   = this;
    var win = $(window);
    var scrollPos = win.scrollTop();
    var defaults = {
        activeClass: 'is-active',
        offset: 0,
        scrollDuration: 500
    };

    _.$el     = element instanceof jQuery ? element : $(element);
    _.active  = false;
    _.options = $.extend(defaults, config || {});

    _.init = function() {
        _.visiblePos = _.$el.offset().top - win.height() - _.options.offset;
        _.updateState();
    };

    _.updateState = function() {
        if (!_.active && scrollPos >= _.visiblePos) {
            _.$el.addClass(_.options.activeClass);
            _.active = true;
        } else if (_.active && scrollPos < _.visiblePos) {
            _.$el.removeClass(_.options.activeClass);
            _.active = false;
        }
    };

    _.$el.on('click', function() {
        $('html').animate({
            scrollTop: 0
        }, _.options.scrollDuration);
        $('body').animate({
            scrollTop: 0
        }, _.options.scrollDuration);
    });

    win.on('scroll', function() {
        scrollPos = win.scrollTop();
        _.updateState();
    });

    win.on('resize', function() {
        _.init();
    });

    _.init();

}

module.exports = Anchor;

},{}],4:[function(require,module,exports){
module.exports = function(errors) {

    var errorClass = 'is-error';

    $.each(errors, function(index, error) {
        error.element.classList.add(errorClass);
        setTimeout(function() {
            error.element.classList.remove(errorClass);
        }, 1500);
    });

};

},{}],5:[function(require,module,exports){
function Menu(element, options) {

    this.config = {
        button: '.menu__btn',
        tab: '.menu__tab',
        content: '.menu__content',
        activeClass: 'is-active',
        openClass: 'is-open',
        stickyClass: 'is-fixed',
        activeTab: 0,
        alwaysOpen: false,
        sticky: true
    };

    $.extend(this.config, options || {});

    // 470px - height of menu
    this.config.shiftY = this.config.alwaysOpen ? 470 : 0;

    this.$el       = element instanceof jQuery ? element : $(element);
    this.activeTab = this.config.activeTab;
    this.opened    = false;
    this.isFixed   = false;

    // this.opened    = this.config.alwaysOpen ? true : false;

    this.init();

}

Menu.prototype = {

    constructor: Menu,

    _initEvents: function() {
        var _ = this;
        this.$buttons.on('mouseover touchend', function(e) {
            var btn   = $(this);
            var index = $(this).index();

            e.preventDefault();

            if (e.type == 'touchend' && index === _.activeTab && _.opened) {
                if (_.config.alwaysOpen) {
                    if (_.isFixed) {
                        console.log(_.isFixed);
                        _.close();
                    }
                } else {
                    _.close();
                }

                return;
            }

            if (!_.opened) {
                _.toggleTabs(index);
                _.open();
            } else if (index !== _.activeTab) {
                _.toggleTabs(index);
            }

        });

        // this.$el.on('click', function(e) {
        //     e.stopPropagation();
        // });

        this.$el.on('mouseleave', function() {
            if (_.opened && !_.config.alwaysOpen) {
                _.close();
            }

            if (_.opened && _.config.alwaysOpen && _.isFixed) {
                _.close();
            }
        });

        // $(document).on('click', function(e) {
        //     console.log(e);
        //     if (_.opened && _.alwaysOpen && _.isFixed) {
        //         _.close();
        //     } else if (_.opened && !_.alwaysOpen) {
        //         _.close();
        //     }
        // });
    },

    _initModEvents: function() {
        var _ = this;
        this.$buttons.on('mouseover touchend', function(e) {
            var index = $(this).index();
            e.preventDefault();
            if (index !== _.activeTab) {
                _.toggleTabs(index);
            }
        });
    },

    toggleTabs: function(index) {
        var _ = this;
        $(_.$buttons[_.activeTab]).removeClass(_.config.activeClass);
        $(_.$buttons[index]).addClass(_.config.activeClass);
        $(_.$tabs[_.activeTab]).removeClass(_.config.activeClass);
        $(_.$tabs[index]).addClass(_.config.activeClass);
        _.activeTab = index;
    },

    makeSticky: function() {
        var _      = this;
        var win    = $(window);
        var scroll = win.scrollTop();
        var scrollDirection;
        var offset = _.$el.offset().top + _.config.shiftY;

        win.on('scroll', function() {
            var updatedScroll = win.scrollTop();
            if (updatedScroll >= scroll) {
                scrollDirection = 'FORVARD';
            } else {
                scrollDirection = 'BACKWARD';
            }

            scroll = win.scrollTop();

            if (scrollDirection == 'FORVARD' && scroll > offset && !_.isFixed) {
                _._toggleFixedPosition();
            }

            if (scrollDirection == 'BACKWARD' && scroll <= offset && _.isFixed) {
                _._toggleFixedPosition();
            }
        });
    },

    _toggleFixedPosition: function() {
        var _ = this;
        if (_.config.alwaysOpen) {
            if (_.isFixed) {
                _.$el.removeClass(_.config.stickyClass);
                _.open(0, 0);
                _.isFixed = false;
            } else {
                _.close(0);
                _.$el.css('top', -67);
                _.$el.addClass(_.config.stickyClass);
                _.$el.animate({top: 0}, 300, function() {
                    _.$el.css('top', '');
                });

                _.isFixed = true;
            }
        } else {
            if (_.isFixed) {
                _.$el.removeClass(_.config.stickyClass);
                _.isFixed = false;
            } else {
                _.$el.addClass(_.config.stickyClass);
                _.close(0);
                _.isFixed = true;
            }
        }
    },

    open: function(duration, index) {
        if (this.opened) return;

        var _        = this;
        var duration = $.isNumeric(duration) ? duration : 300;

        _.$content.slideDown({
            duration: duration,
            start: function() {
                setTimeout(function() {
                    _.$el.addClass(_.config.openClass);
                }, 100);

                if ($.isNumeric(index)) {
                    _.toggleTabs(index);
                }
            },

            complete: function() {
                _.opened = true;
            },
        });
    },

    close: function(duration) {
        if (!this.opened) return;

        var _        = this;
        var duration = $.isNumeric(duration) ? duration : 300;

        _.$content.slideUp({
            duration: duration,
            start: function() {
                setTimeout(function() {
                    $(_.$buttons[_.activeTab]).removeClass(_.config.activeClass);
                }, 200);
            },

            complete: function() {
                _.$el.removeClass(_.config.openClass);
                _.opened = false;
            },
        });
    },

    init: function() {
        var _ = this;
        _.$buttons = _.$el.find(_.config.button);
        _.$tabs    = _.$el.find(_.config.tab);
        _.$content = _.$el.find(_.config.content);

        // if (_.config.alwaysOpen) {
        //     _._initModEvents();
        //     _.toggleTabs(_.activeTab);
        // } else {
        //     _._initEvents();
        //     _.$content.slideUp();
        // }

        if (_.config.alwaysOpen) {
            _.toggleTabs(_.activeTab);
            _.open();
        } else {
            _.$content.slideUp();
        }

        _._initEvents();

        if (_.config.sticky) {
            _.makeSticky();
        }
    }

};

module.exports = Menu;

},{}],6:[function(require,module,exports){
function Popup(options) {

    var defaults, opt;
    var _ = this;

    defaults = {
        duration: 300,
        popupSelector: '.popup',
        innerSelector: '.popup__inner',
        closePopupSelector: '.js-popup-close, .popup__close',
        activeClass: 'is-active',
        enableEvents: true
    };

    _.options = opt = $.extend(defaults, options || {});

    _.open = function(element) {
        var popup = element instanceof jQuery ? element : $(element);

        popup.fadeIn({
            duration: opt.duration,
            complete: function() {
                popup.addClass(opt.activeClass);
            }
        });
    };

    _.close = function(element) {
        var popup = element instanceof jQuery ? element : $(element);

        if (!popup.hasClass(opt.activeClass)) return;

        popup
            .removeClass(opt.activeClass)
            .delay(opt.duration)
            .fadeOut({
                duration: opt.duration
            });
    };

    _.initEvents = function() {
        $(opt.closePopupSelector).on('click', function(e) {
            e.preventDefault();
            _.close($(this).parents(opt.popupSelector));
        });

        $(opt.popupSelector).on('click', function() {
            _.close(this);
        });

        $(opt.innerSelector).on('click', function(e) {
            e.stopPropagation();
        });
    };

    if (opt.enableEvents) {
        _.initEvents();
    }

}

module.exports = Popup;

},{}],7:[function(require,module,exports){
function Slider(element, config) {

    var slickOptions;

    this.$el = element instanceof jQuery ? element : $(element);
    this.$slider = this.$el.find('.slider__slides');

    defaults = {
        autoplay: true,
        autoplaySpeed: 5000,
        fade: false,
        arrows: true,
        dots: false,
        slide: '.slide',
        prevArrow: this.$el.find('.slider__prev'),
        nextArrow: this.$el.find('.slider__next')
    };

    slickOptions = $.extend(defaults, config || {});

    this.$slider.slick(slickOptions);

    // this.init();

    return this;

}

Slider.prototype = {

    constructor: Slider,

    init: function() {
        console.log(this);
    }

};

module.exports = Slider;

},{}]},{},[1])


//# sourceMappingURL=main.js.map