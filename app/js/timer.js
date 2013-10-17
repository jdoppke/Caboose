var Timer = (function(){

    var startTime;
    var timeout;
    var timeElem = $("#running-time");
    var startElem = $("#first-request");
    var lastElem = $("#last-request");

    function _addLeadingZero(val) {
        return (val < 10) ? ("0" + val) : val;
    }

    function _formatTime(date) {
        var sec  = date.getSeconds();
        var min  = date.getMinutes();
        var hour = date.getHours();

        sec  = _addLeadingZero(sec);
        min  = _addLeadingZero(min);
        hour = _addLeadingZero(hour);

        return hour + ':' + min + ':' + sec; 
    }

    function _formatDate(date) {
        var mon = date.getMonth() + 1;
        var date = date.getDate();
        return mon + '/' + date;
    }

    function _formatDuration(sec) {
        var seconds = Math.floor(sec % 60);
        var min = Math.floor(sec / 60);
        var hours = Math.floor(min / 60);

        sec   = _addLeadingZero(seconds);
        min   = _addLeadingZero(min);
        hours = _addLeadingZero(hours);

        return hours + ":" + min + ":" + sec;
    }

    function _updateTime() {
        var timeDiffInSec = (new Date() - startTime);
        timeElem.textContent = _formatDuration(timeDiffInSec/1000);
    }

    function start() {
        startTime = new Date();
        startElem.textContent = _formatDate(startTime) + ' @ ' + _formatTime(startTime);
        timeout = setInterval(_updateTime, 1000);
    }

    function updateLastReq() {
        var newTime = new Date();
        lastElem.textContent = _formatDate(newTime) + ' @ ' + _formatTime(newTime);
    }

    return {
        start: start,
        updateLastReq: updateLastReq
    };

})();