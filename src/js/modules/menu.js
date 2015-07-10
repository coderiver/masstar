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
        sticky: true,
    };

    $.extend(this.config, options || {});

    this.$el       = element instanceof jQuery ? element : $(element);
    this.activeTab = this.config.activeTab;
    this.opened    = false;

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
        var offset = _.$el.offset().top;

        win.on('scroll', function() {
            var updatedScroll = win.scrollTop();
            if (updatedScroll >= scroll) {
                scrollDirection = 'FORVARD';
            } else {
                scrollDirection = 'BACKWARD';
            }

            scroll = win.scrollTop();

            if (scrollDirection == 'FORVARD' && scroll > offset) {
                _.$el.addClass(_.config.stickyClass);
                _.close();
            }

            if (scrollDirection == 'BACKWARD') {

                if (scroll <= offset) {
                    _.$el.removeClass(_.config.stickyClass);
                    if (_.config.alwaysOpen) {
                        _.open();
                    }
                } else {
                    _.close();
                }
            }
        });
    },

    open: function() {
        if (this.opened) return;

        var _ = this;

        _.$content.slideDown({
            duration: 300,
            start: function() {
                setTimeout(function() {
                    _.$el.addClass(_.config.openClass);
                }, 100);
            },

            complete: function() {
                _.opened = true;
            },
        });
    },

    close: function() {
        if (!this.opened) return;

        var _ = this;

        _.$content.slideUp({
            duration: 300,
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
