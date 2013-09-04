(function() {

    function $(sel) {
        var nodes = document.querySelectorAll(sel);
        if (nodes.length === 1) {
            return nodes[0];
        }
        return nodes;
    };

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) {
            return 0;
        }
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };

    window.$ = $;
    window.formatSize = bytesToSize;

})();