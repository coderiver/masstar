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
