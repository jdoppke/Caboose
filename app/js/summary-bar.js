var SummaryBar = (function() {

    var reqCntElem = $('#total-request');
    var totalSizeElem = $('#total-size');
    var lastReq = $('#last-request');

    function update(totalReq, totalSize, lastReqDate) {

        lastReqDate = formatDate(lastReqDate) + ' @ ' + formatTime(lastReqDate);

        reqCntElem.textContent = totalReq;
        totalSizeElem.textContent = getReadableSize(totalSize);
        lastReq.textContent = lastReqDate;
    }

    return {
        update: update
    };

})();