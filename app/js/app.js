var Caboose = (function(){

    var UPDATE_INTERVAL = 1000;
    var requestSize  = 0;
    var requestCount = 0;
    var timer;

    function _incrementData(data) {
        // TODO: Use only one request count var, currently have two, one here
        //       and another in FileBreakDown module.
        requestCount++;
        requestSize += ++data["bytes"];
    }

    function updateData(d) {

        try {
            var data = JSON.parse(d.data);
        } catch (e) {
            console.log(e);
        }

        if (data) {
            BrowserBreakDown.update(data["user-agent"]);
            FileBreakDown.update(data["file"]);
            _incrementData(data);
            TimeLine.updateData(data);
            SummaryBar.update(requestCount, requestSize);
            FireLine.fire();
            Table.update(data);
        }

    }

    function go() {
        TimeLine.tick();
        Timer.updateTime();
        timer = setTimeout(go, UPDATE_INTERVAL);
    }

    function stop() {
        clearTimeout(timer);
    }

    return {
        updateData: updateData,
        go: go,
        stop: stop
    };

})();