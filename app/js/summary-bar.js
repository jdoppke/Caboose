var SummaryBar = (function() {

    var reqTotal = $('#requests-total');
    var reqPerMin = $('#requests-per-min');
    var reqPerSec = $('#requests-per-sec');

    var sizeTotal = $('#req-size-total');
    var sizePerReq = $('#req-size-per-req');

    var serveTime = $('#req-serve');
    var hostCnt = $('#unique-host-cnt');

    var timeRange;
    var timeRangeInSec;

    function init() {

        timeRange = Caboose.conf.timeRange;
        timeRangeInSec = timeRange * 60;

    }

    function update(totalReq, totalSize) {

        var dataLen = DATA.rawData.length;
        var bytes = DATA.getTotalBytes();

        reqTotal.textContent = dataLen;
        reqPerMin.textContent = (dataLen / timeRange).toFixed(2);
        reqPerSec.textContent = (dataLen / timeRangeInSec).toFixed(2);

        sizeTotal.textContent = getReadableSize(bytes);
        sizePerReq.textContent = getReadableSize((bytes / dataLen) || 0);

        serveTime.textContent = ((DATA.getTotalServeTime() / dataLen) || 0).toFixed(2);
        hostCnt.textContent = DATA.getHostCount();

    }

    return {
        init: init,
        update: update
    };

})();