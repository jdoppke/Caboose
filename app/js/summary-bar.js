var SummaryBar = (function() {

    var reqTotal = $('#requests-total');
    var reqPerMin = $('#requests-per-min');
    var reqPerSec = $('#requests-per-sec');

    var sizeTotal = $('#req-size-total');
    var sizePerReq = $('#req-size-per-req');

    var serveTime = $('#req-serve')

    var timeRange = Caboose.conf.timeRange;
    var timeRangeInSec = timeRange * 60;

    function update(totalReq, totalSize) {

        var dataLen = DATA.rawData.length;
        var bytes = DATA.getTotalBytes();

        reqTotal.textContent = dataLen;
        reqPerMin.textContent = (dataLen / timeRange).toFixed(2);
        reqPerSec.textContent = (dataLen / timeRangeInSec).toFixed(2);

        sizeTotal.textContent = getReadableSize(bytes);
        sizePerReq.textContent = getReadableSize(bytes / dataLen);

        serveTime.textContent = (DATA.getTotalServeTime() / dataLen).toFixed(2);

    }

    return {
        update: update
    };

})();