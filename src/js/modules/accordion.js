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
