var Ping = (function() {

    var ball = $('#ping-dot');
    var wrap = $('.ping-wrap');

    function start() {
        ball.classList.add('go-right');
    }

    function error() {
        ball.classList.remove('go-right', 'go-left');
        wrap.classList.add('error');
    }

    function toggle() {
        var newDir = (_movingRight() ? 'go-left' : 'go-right');
        ball.classList.remove('go-right', 'go-left');
        ball.classList.add(newDir);
    }

    function _movingRight() {
        return ball.classList.contains('go-right');
    }

    return {
        start: start,
        error: error,
        toggle: toggle
    }

})();