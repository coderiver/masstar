function Menu(element) {

    this.$el       = element instanceof jQuery ? element : $(element);
    this.activeTab = 0;
    this.opened    = false;

    this.init();

}

Menu.prototype = {

    constructor: Menu,

    config: {
        button: '.menu__btn',
        tab: '.menu__tab',
        activeClass: 'is-active'
    },

    _initEvents: function() {
        var _this = this;
        this.$buttons.on('click', function(e) {
            var index = $(this).index();
            e.preventDefault();
            _this.toggleTabs(index);
        });
    },

    toggleTabs: function(index) {
        $(this.$buttons[this.activeTab]).removeClass(this.config.activeClass);
        $(this.$buttons[index]).addClass(this.config.activeClass);
        $(this.$tabs[this.activeTab]).removeClass(this.config.activeClass);
        $(this.$tabs[index]).addClass(this.config.activeClass);
        this.activeTab = index;
    },

    init: function() {
        this.$buttons = this.$el.find(this.config.button);
        this.$tabs    = this.$el.find(this.config.tab);

        this._initEvents();
        console.log(this);
    }

};

module.exports = Menu;
