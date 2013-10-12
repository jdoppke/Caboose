var StatusBar = (function() {

    var div = $(".status");
    var DELAY = 5000;

    function _openStatus() {
        div.classList.add("open");
    }

    function closeStatus() {
        div.classList.remove("open");
    }

    function _setStatus(message, cls) {
        div.textContent = message;
        div.className = 'status ' + cls;
        _openStatus();

        if (cls === 'success') {
            setTimeout(closeStatus, DELAY);
        }

    }

    function setError(message) {
        _setStatus(message, 'error');
    }

    function setSuccess(message) {
        _setStatus(message, 'success');
    }

    return {
        setError: setError,
        setSuccess: setSuccess,
        close: closeStatus
    };

})();