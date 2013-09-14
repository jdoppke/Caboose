var StatusBar = (function() {

    var reqCntElem = $('#total-request');
    var totalSizeElem = $('#total-size');

    function update(totalReq, totalSize) {
        reqCntElem.innerHTML = totalReq;
        totalSizeElem.innerHTML = getReadableSize(totalSize);
    }

    return {
        update: update
    };

})();