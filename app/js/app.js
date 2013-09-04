var Caboose = (function(){

    function init() {
        // Set up selectors/variables...
    }

    function updateData(d) {

        console.log(d);
/*
        Test code below...
        totalReqRawCount++;

        var r = JSON.parse(d.data);

        // Set first and last date
        if (!firstReqVal) { firstReqVal = r['date']; }
        lastReqVal= r['date'];

        // Set request type/count
        var file = r['file'];
        var dot  = file.indexOf('.');

        // If there is a dot, get the file extension
        if (dot != -1) {
            var ext  = file.substring(dot + 1, file.length);

            if (!reqTypeCount[ext]) {
                reqTypeCount[ext] = 0;
            }

            reqTypeCount[ext]++;

            var newData = (function() {
                var d = [];
                for (var prop in reqTypeCount) {
                    console.log(totalReqRawCount);
                    d.push({
                        'type': prop,
                        'value': (reqTypeCount[prop]/totalReqRawCount) * 100
                    });
                }
                return d;
            })();

            Distribution.update(newData);

        } else {
            // Otherwise it's *probably* a path for a page (/user/name),
            // might need some tweaking. Will eventually store the path.
            reqTypeCount['path']++;
        }

        totalSizeReqRawCount += +r['bytes'];

        // Update UI
        firstReq.textContent = firstReqVal;
        lastReq.textContent = lastReqVal;
        totalReq.textContent = totalReqRawCount; 
        totalSizeReq.textContent = formatBytes(totalSizeReqRawCount);
*/
    }

    return {
        init: init,
        updateData: updateData
    }

})();