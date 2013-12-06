var Caboose = (function(){

    var UPDATE_INTERVAL = 1000;

    var requestCount = 0;
    var requestSize  = 0;
    var reqTypeCount = {};
    var browserCount = {};
    var browserHits  = 0;
    var timer;

    function _incrementBrowsers(userAgent) {
        var browser = identifyBrowser(userAgent);

        browserHits++;

        if (browser in browserCount) {
            browserCount[browser]++;
        } else {
            browserCount[browser] = 1;
        }

        var tally = [];
        for (var browser in browserCount) {
            tally.push({
                "type": browser,
                "value": (browserCount[browser]/browserHits) * 100
            });
        }


        console.log(tally);
        return tally;

    }

    function _incrementData(data) {
        requestCount++;
        requestSize += ++data["bytes"];
    }

    function _formatFileData(data) {
        var file = data["file"];
        var dot  = file.lastIndexOf(".");

        // Get the file extension if there is one
        if (dot !== -1) {
            var ext  = file.substring(dot + 1, file.length);

            if (!reqTypeCount[ext]) {
                reqTypeCount[ext] = 0;
            }

            reqTypeCount[ext]++;

            var newData = (function() {
                var d = [];
                for (var prop in reqTypeCount) {
                    d.push({
                        "type": prop,
                        "value": (reqTypeCount[prop]/requestCount) * 100
                    });
                }
                return d;
            })();

        } else {
            // Needs work and testing...
            if (reqTypeCount["doc"]) {
                reqTypeCount["doc"]++;
            } else {
                reqTypeCount["doc"] = 0;
            }

            var newData = (function() {
                var d = [];
                for (var prop in reqTypeCount) {
                    d.push({
                        "type": prop,
                        "value": (reqTypeCount[prop]/requestCount) * 100
                    });
                }
                return d;
            })();

        }
        return newData;
    }

    function updateData(d) {

        try {
            var data = JSON.parse(d.data);
        } catch (e) {
            console.log(e);
        }

        if (data) {
            BrowserBreakDown.update(_incrementBrowsers(data["user-agent"]));
            _incrementData(data);
            BreakDown.update(_formatFileData(data));
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