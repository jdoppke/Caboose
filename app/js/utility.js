(function() {

    function $(sel) {
        var nodes = document.querySelectorAll(sel);
        if (nodes.length === 1) {
            return nodes[0];
        }
        return nodes;
    };

    // http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable
    function getReadableSize(bytes) {
        var i = -1;
        var byteUnits = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            bytes = bytes/1024;
            i++;
        } while (bytes > 1024);

        return Math.max(bytes, 0.1).toFixed(2) + ' ' + byteUnits[i];
    };

    function _addLeadingZero(val) {
        return (val < 10) ? ("0" + val) : val;
    }

    function formatTime(date) {
        var sec  = date.getSeconds();
        sec = _addLeadingZero(sec);

        var min  = date.getMinutes();
        min = _addLeadingZero(min);

        var hour = date.getHours();
        hour = _addLeadingZero(hour);

        return hour + ':' + min + ':' + sec; 
    }

    function formatDate(date) {
        var mon = date.getMonth() + 1;
        var date = date.getDate();
        return mon + '/' + date;
    }

    window.$ = $;
    window.getReadableSize = getReadableSize;
    window.formatTime = formatTime;
    window.formatDate = formatDate;

})();