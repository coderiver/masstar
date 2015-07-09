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

        // var inner = popup.find(opt.innerSelector);
        popup.fadeIn({
            duration: opt.duration,
            complete: function() {
                popup.addClass(opt.activeClass);
            }
        });
    };

    _.close = function(element) {
        var popup = element instanceof jQuery ? element : $(element);

        // var inner = popup.find(opt.innerSelector);
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
