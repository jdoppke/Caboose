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

    function tick() {

        var data = DATA.getTimelineData();

        startTime = _startTime(new Date());
        x.domain([startTime, new Date()]);
        xAxisSel.call(xAxis);

        y.domain([0, d3.max(data, function(d) { return d.requestCount; })]);
        yAxisSel.call(yAxis);

        gridLines.call(_makeGridLines().tickSize(-width, 0, 0).tickFormat(""));
        svg.select(".line").attr("d", lineFunc(data));

        /* Update error points
        var errPts = errorPts.selectAll(".errors").data(errorPoints);

        errPts
            .attr("x1", function(d) {
                return x(new Date(d[0]) - 1);
            })
            .attr("x2", function(d) {
                return x(new Date(d[0]) - 1);
            })
            .attr("y1", 0)
            .attr("y2", height);

        errPts
            .enter()
            .append("line")
            .attr("class", "errors")
            .attr("x1", function(d) {
                return x(new Date(d[0]) - 1);
            })
            .attr("x2", function(d) {
                return x(new Date(d[0]) - 1);
            })
            .attr("y1", 0)
            .attr("y2", height);
        */

    }

    var divWidth = $(".time-line-vis").offsetWidth;
    var divHeight = $(".time-line").offsetHeight;
    var margin = {top: 5, right: 5, bottom: 40, left: 25};
    var width = divWidth - margin.left - margin.right;
    var height = divHeight - margin.top - margin.bottom;

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

    var svg = d3.select(".time-line")
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
        .y(function(d) { return y(d.requestCount); });

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

    /* Add layer for error points
    var errorPts = svg.append("g")
        .attr("class", "error-points")
        .attr("clip-path", "url(#time-line-clip)");
    */

    function init() {
        duration = Caboose.conf.timeRange || 5; // Timeline range in minutes.
    }

    return {
        init: init,
        tick: tick
    };

})();