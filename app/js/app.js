var Caboose = (function(){

    var UPDATE_INTERVAL = 1000;
    var requestSize  = 0;
    var requestCount = 0;
    var timer;

    var data = [];

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
            _incrementData(data);
            SummaryBar.update(requestCount, requestSize);
            BrowserBreakDown.update(data["user-agent"]);
            FileBreakDown.update(data["file"]);
            TimeLine.update(data);
            Table.update(data);

            //FireLine.fire();
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