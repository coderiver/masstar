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
