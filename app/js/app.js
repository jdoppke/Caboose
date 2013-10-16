var Caboose = (function(){

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
            console.log(data);
            _incrementData(data);
            BreakDown.update(_formatFileData(data));
            //Distribution.update(_formatFileData(data));
            Timeline.incrementReqCount();
            SummaryBar.update(requestCount, requestSize, new Date());
            FireLine.fire();
            Table.update(data);
        }

    }

    return {
        updateData: updateData
    };

})();