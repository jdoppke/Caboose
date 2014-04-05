var DATA = (function() {

    var rawData = [];

    var timelineObj = {};
    var totalBytes = 0;
    var totalServeTime = 0;

    var rightBound;
    var leftBound;

    function cleanup() {

        for (var i=0; i<rawData.length; i++) {

            var dateStamp = new Date(rawData[i].date);

            if (dateStamp < leftBound) {
                rawData.shift();
            }

        }

    }

    function incrementData() {

        timelineObj = {};
        totalBytes = 0;
        totalServeTime = 0;

        for (var i=0; i<rawData.length; i++) {

            var dateStamp = Math.floor(+new Date(rawData[i].date) / 1000);

            if (dateStamp in timelineObj) {

                timelineObj[dateStamp].requestCount++;

            } else {

                timelineObj[dateStamp] = {
                    requestCount: 1,
                    date: dateStamp
                };

            }

            totalBytes += rawData[i].bytes;
            totalServeTime += rawData[i]['serve-time']; // Change to camelCase.

        }

    }

    function getTimelineData() {

        var timelineData = [];

        for (var time in timelineObj) {

            timelineData.push({
                date: new Date(+time * 1000),
                requestCount: timelineObj[time].requestCount
            });

        }

        return timelineData;

    }

    function compute() {

        rightBound = +new Date();
        leftBound  = rightBound - (Caboose.conf.timeRange * 60 * 1000);

        // Make sure our data is within the bounds.
        cleanup();

        // Total up all request data.
        incrementData();

    }

    function getTotalBytes() {
        return totalBytes;
    }

    function getTotalServeTime() {
        return totalServeTime;
    }

    return {
        rawData: rawData,
        getTotalBytes: getTotalBytes,
        getTotalServeTime: getTotalServeTime,
        compute: compute,
        getTimelineData: getTimelineData
    };

})();