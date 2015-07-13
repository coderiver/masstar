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
