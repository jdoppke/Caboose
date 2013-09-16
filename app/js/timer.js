var Timer = (function(){

    var startTime;
    var timeout;
    var hourOffset;
    var timeElem = $("#running-time");
    var startElem = $("#first-request");

    function _addLeadingZero(val) {
        return (val < 10) ? ("0" + val) : val;
    }

    function _formatTime(date) {
        var sec  = date.getSeconds();
        sec = _addLeadingZero(sec);

        var min  = date.getMinutes();
        min = _addLeadingZero(min);

        var hour = date.getHours();
        hour = hour - hourOffset;
        hour = _addLeadingZero(hour);

        return hour + ':' + min + ':' + sec; 
    }

    function _updateTime() {
        var timeDiff = new Date((new Date() - startTime));
        timeElem.textContent = _formatTime(timeDiff);
    }

    function start() {
        startTime = new Date();
        hourOffset = (new Date(1)).getHours();
        //startElem.textContent = _formatTime(startTime);
        timeout = setInterval(_updateTime, 1000);
    }

    return {
        start: start
    };

})();