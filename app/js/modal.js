var Modal = (function() {

    var overlay = $(".overlay");

    function _showOverlay() {
        overlay.classList.add("show");
    }

    function _hideOverlay() {
        overlay.classList.remove("show");
    }

    function show(sel) {
        _showOverlay();
        $(sel).classList.add("show");
    }

    function hide(sel) {
        _hideOverlay();
        $(sel).classList.remove("show");
    }

    return {
        show: show,
        hide: hide
    };

})();