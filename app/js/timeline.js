var TimeLine = (function() {

    function _makeGridLines() {
        return d3.svg.axis()
            .scale(y)
            .ticks(5)
            .orient("left");
    }

    function _startTime(endTimeReference) {
        return new Date(endTimeReference - (duration * 60 * 1000));
    }

    function _formatRawData(rawData) {
        var newData = [];
        for (var prop in rawData) {
            var date = new Date(prop);
            if (date < startTime) {
                delete rawData[prop];
            } else {
                newData.unshift({
                    "date": date,
                    "req" : rawData[prop]
                });
            }
        }
        return newData;
    }

    function tick() {
        if (!(new Date() in rawData)) {
            rawData[new Date()] = 0;
        }

        data = _formatRawData(rawData);

        startTime = _startTime(new Date());
        x.domain([startTime, new Date()]);
        xAxisSel.call(xAxis);

        y.domain([0, d3.max(data, function(d) { return d.req; })]);
        yAxisSel.call(yAxis);

        gridLines.call(_makeGridLines().tickSize(-width, 0, 0).tickFormat(""));

        svg.select(".line").attr("d", lineFunc(data));

        // Update error points
        var errPts = errorPts.selectAll(".errors").data(errorPoints);

        errPts
            .attr("cx", function(d) { return x(new Date(d[0])) - 1; })
            .attr("cy", function(d) { return y(d[2]) - 1; });

        errPts
            .enter()
            .append("circle")
            .attr("class", "errors")
            .attr("cx", function(d) {
                return x(new Date(d[0]) - 1);
            })
            .attr("cy", function(d) { return y(d[2]) - 1; })
            .attr("r", 2);

    }

    function update(d) {
        var date = new Date(d.date);
        if (date in rawData) {
            rawData[date]++;
        } else {
            rawData[date] = 1;
        }
        if (d.status == 404) {
            errorPoints.push([date, d, rawData[date]]);
            console.log(date + " : " + rawData[date]);
        }
    }

    var divWidth = $(".new-time-line-vis").offsetWidth;
    var margin = {top: 5, right: 5, bottom: 20, left: 30};
    var width = divWidth - margin.left - margin.right;
    var height = 130 - margin.top - margin.bottom;

    var endTime = new Date();
    var duration; // Timeline range in minutes.
    var startTime = _startTime(endTime);

    var data = [];
    var rawData = {};

    var errorPoints = [];

    var x = d3.time.scale()
        .domain([startTime, endTime])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, 10])
        .range([height, 0]);

    var svg = d3.select(".new-time-line")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +")");

    var gridLines = svg.append("g")
        .attr("class", "grid")
        .call(_makeGridLines().tickSize(-width, 0, 0).tickFormat(""));

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(5)
        .orient("left");

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var yAxisSel = svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    var xAxisSel = svg.selectAll(".x-axis");

    var lineFunc = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.req); });

    // Add layer for error points
    var errorPts = svg.append("g")
        .attr("class", "error-points");

    // Add clip path to hide overflow.
    svg.append("clipPath")
        .attr("id", "time-line-clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    var path = svg.append("g")
        .append("path")
        .attr("class", "line path")
        .attr("clip-path", "url(#time-line-clip)")
        .attr("d", lineFunc(data));

    function init() {
        duration = Caboose.conf.timeRange || 5; // Timeline range in minutes.
    }

    return {
        init: init,
        tick: tick,
        update: update
    };

})();