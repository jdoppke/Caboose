var Caboose = (function(){

    var requestCount = 0;
    var requestSize  = 0;
    var reqTypeCount = {};


    function updateData(d) {

        try {
            var data = JSON.parse(d.data);
        } catch (e) {
            console.log(e);
        }

        if (data) {
            console.log(data);

            requestCount++;
            requestSize += ++data['bytes'];

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
                // Otherwise it's *probably* a path for a page (/user/name/),
                // might need some tweaking. Will eventually store the path.
                reqTypeCount['path']++;
            }

            StatusBar.update(requestCount, requestSize);
            Table.update(data);
        }
/*
        Test code below...
        totalReqRawCount++;


        // Set first and last date
        if (!firstReqVal) { firstReqVal = r['date']; }
        lastReqVal= r['date'];

        

        totalSizeReqRawCount += +r['bytes'];

        // Update UI
        firstReq.textContent = firstReqVal;
        lastReq.textContent = lastReqVal;
        totalReq.textContent = totalReqRawCount; 
        totalSizeReq.textContent = formatBytes(totalSizeReqRawCount);
*/
    }

    return {
        updateData: updateData
    };

})();