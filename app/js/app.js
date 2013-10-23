var Caboose = (function(){

    var UPDATE_INTERVAL = 1000;

    var requestCount = 0;
    var requestSize  = 0;
    var reqTypeCount = {};

    function _incrementData(data) {
        requestCount++;
        requestSize += ++data['bytes'];
    }

    function _formatFileData(data) {
        var file = data['file'];
        var dot  = file.indexOf('.');

        // Get the file extension if there is one
        if (dot !== -1) {
            var ext  = file.substring(dot + 1, file.length);

            if (!reqTypeCount[ext]) {
                reqTypeCount[ext] = 0;
            }

            reqTypeCount[ext]++;

            var newData = (function() {
                var d = [];
                for (var prop in reqTypeCount) {
                    d.push({
                        'type': prop,
                        'value': (reqTypeCount[prop]/requestCount) * 100
                    });
                }
                return d;
            })();

        } else {
            // Otherwise it's *probably* a path for a page (/user/name/),
            // might need some tweaking. Will eventually store the path.
            reqTypeCount['path']++;
        }
        return newData;
    }

    function updateData(d) {

        try {
            var data = JSON.parse(d.data);
        } catch (e) {
            console.log(e);
        }

        if (data) {
            _incrementData(data);
            BreakDown.update(_formatFileData(data));
            Timeline.incrementReqCount();
            TL.updateData(data);
            SummaryBar.update(requestCount, requestSize);
            FireLine.fire();
            Table.update(data);
        }

    }

    function go() {
        TL.tick();
        Timer.updateTime();
        setTimeout(go, UPDATE_INTERVAL);
    }

    return {
        updateData: updateData,
        go: go
    };

})();