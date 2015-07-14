module.exports = function(errors) {

    var errorClass = 'is-error';

    $.each(errors, function(index, error) {
        error.element.classList.add(errorClass);
        setTimeout(function() {
            error.element.classList.remove(errorClass);
        }, 1500);
    });

};
