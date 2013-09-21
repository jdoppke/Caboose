var FireLine = (function() {

    var sec = $('.fire-line');

    function _remove() {
        this.remove();
    }

    function fire() {
        var dot = document.createElement('div');
        dot.className = 'fire';

        dot.addEventListener('webkitTransitionEnd', _remove, false);

        sec.appendChild(dot);

        // Need a slight delay for the browser to draw the dot in it's initial
        // position to the transition can take place.
        setTimeout(function() {
            dot.classList.add('go');
        }, 10);

    }

    return {
        fire: fire
    };

})();