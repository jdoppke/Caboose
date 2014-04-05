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

        if (bytes < 1024) {
            return bytes.toFixed(2) + ' B';
        }

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

    /**
     * http://odyniec.net/blog/2010/09/decrypting-the-user-agent-string-in-javascript/
     * Extracts the browser name and version number from user agent string.
     *
     * @param userAgent
     *            The user agent string to parse. If not specified, the contents of
     *            navigator.userAgent are parsed.
     * @param elements
     *            How many elements of the version number should be returned. A
     *            value of 0 means the whole version. If not specified, defaults to
     *            2 (major and minor release number).
     * @return A string containing the browser name and version number, or null if
     *         the user agent string is unknown.
     */
    function identifyBrowser(userAgent, elements) {
        var regexps = {
                'Chrome': [ /Chrome\/(\S+)/ ],
                'Firefox': [ /Firefox\/(\S+)/ ],
                'MSIE': [ /MSIE (\S+);/ ],
                'Opera': [
                    /Opera\/.*?Version\/(\S+)/,     /* Opera 10 */
                    /Opera\/(\S+)/                  /* Opera 9 and older */
                ],
                'Safari': [ /Version\/(\S+).*?Safari\// ]
            },
            re, m, browser, version;

        if (userAgent === undefined)
            userAgent = navigator.userAgent;

        if (elements === undefined)
            elements = 2;
        else if (elements === 0)
            elements = 1337;

        for (browser in regexps)
            while (re = regexps[browser].shift())
                if (m = userAgent.match(re)) {
                    version = (m[1].match(new RegExp('[^.]+(?:\.[^.]+){0,' + --elements + '}')))[0];
                    return browser + ' ' + version;
                }
        return null;
    }


    window.$ = $;
    window.getReadableSize = getReadableSize;
    window.formatTime = formatTime;
    window.formatDate = formatDate;
    window.identifyBrowser = identifyBrowser;

})();