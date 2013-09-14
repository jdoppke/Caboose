var StatusBar = (function() {

    var reqCntElem = $('#total-request');

    function update(totalReq) {
        reqCntElem.innerHTML = totalReq;
    }

    return {
        update: update
    };

})();