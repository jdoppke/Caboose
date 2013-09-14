var StatusBar = (function() {

    var reqCntElem = $('#total-request');
    var totalSizeElem = $('#total-size');

    function update(totalReq, totalSize) {
        reqCntElem.textContent = totalReq;
        totalSizeElem.textContent = getReadableSize(totalSize);
    }

    return {
        update: update
    };

})();