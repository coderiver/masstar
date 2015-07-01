(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// require('jquery');
// require('modernizr');

var accordion = require('./modules/accordion');

accordion(
    '.accordion',
    '.accordion__item',
    '.accordion__btn',
    '.accordion__content'
    );

console.log('Hello World!');

},{"./modules/accordion":2}],2:[function(require,module,exports){
// var $ = require('jquery');

function makeAccordion(wrapper, item, btn, content) {

    var accordion   = $(wrapper),
        activeClass = 'is-active';

    if ( accordion.length ) {

        accordion.each(function() {
            var el       = $(this),
                btns     = el.find(btn),
                items    = el.find(item),
                contents = el.find(content);

            btns.on('click', function(event) {
                event.preventDefault();

                var currentBtn     = $(this),
                    currentItem    = currentBtn.parent(item),
                    currentContent = currentBtn.siblings(content);

                if ( currentItem.hasClass(activeClass) ) {
                    currentItem.removeClass(activeClass);
                    currentContent.slideUp(200);
                } else {
                    items.removeClass(activeClass);
                    contents.slideUp(200);
                    currentItem.addClass(activeClass);
                    currentContent.slideDown(200);
                }
            });
        });
    }

}

module.exports = makeAccordion;

},{}]},{},[1])


//# sourceMappingURL=main.js.map