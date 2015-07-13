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

            if (!_.opened) {
                _.toggleTabs(index);
                _.open();
            } else if (index !== _.activeTab) {
                _.toggleTabs(index);
            }
        });

        this.$el.on('click', function(e) {
            e.stopPropagation();
        });

        this.$el.on('mouseleave', function() {
            if (_.opened && !_.config.alwaysOpen) {
                _.close();
            }

            if (_.opened && _.config.alwaysOpen && _.isFixed) {
                _.close();
            }
        });

        $('body').on('click', function() {
            if (_.opened && !_.config.alwaysOpen) {
                _.close();
            }
        });
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
