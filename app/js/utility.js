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

    window.$ = $;
    window.getReadableSize = getReadableSize;

})();