var Timer = (function(){

    var startTime;
    var timeout;
    var timeElem = $("#running-time");
    var startElem = $("#first-request");

    function _updateTime() {
        var timeDiff = new Date((new Date() - startTime));
        timeElem.textContent = formatTime(timeDiff);
    }

    function start() {
        startTime = new Date();
        startElem.textContent = formatDate(startTime) + ' @ ' + formatTime(startTime);
        timeout = setInterval(_updateTime, 1000);
    }

    return {
        start: start
    };

})();