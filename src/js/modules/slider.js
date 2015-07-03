function Slider(element, config) {

    var $el, slickOptions;

    this.$el = element instanceof jQuery ? element : $(element);
    this.$slider = this.$el.find('.slider__slides');

    defaults = {
        autoplay: true,
        autoplaySpeed: 5000,
        // slide: this.$slider.find('.slider__slide'),
        arrows: true,
        prevArrow: this.$el.find('.slider__prev'),
        nextArrow: this.$el.find('.slider__next')
    };

    slickOptions = $.extend(defaults, config || {});

    this.$slider.slick(slickOptions);

    this.init();

}

Slider.prototype = {

    constructor: Slider,

    init: function() {
        console.log(this);
    }

}

module.exports = Slider;
