var Timer = (function(){

    var startTime;
    var timeout;
    var hourOffset;
    var timeElem = $("#running-time");

    function _addLeadingZero(val) {
        return (val < 10) ? ("0" + val) : val;
    }

    function _updateTime() {
        var timeDiff = new Date((new Date() - startTime));

        var sec  = timeDiff.getSeconds();
        sec = _addLeadingZero(sec);

        var min  = timeDiff.getMinutes();
        min = _addLeadingZero(min);

        var hour = timeDiff.getHours();
        hour = hour - hourOffset;
        hour = _addLeadingZero(hour);

        var timeStr = hour + ':' + min + ':' + sec; 
        timeElem.textContent = timeStr;
    }

    function start() {
        startTime = new Date();
        hourOffset = (new Date(1)).getHours();
        timeout = setInterval(_updateTime, 1000);
    }

    return {
        start: start
    };

})();