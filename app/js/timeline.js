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
            if (new Date(prop) < startTime) {
                delete rawData[prop];
            } else {
                newData.unshift({
                    "date": new Date(prop),
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
    }

    function updateData(d) {
        if (new Date(d.date) in rawData) {
            rawData[new Date(d.date)]++;
        } else {
            rawData[new Date(d.date)] = 1;
        }
    }

    var divWidth = $(".new-time-line-vis").offsetWidth;
    var margin = {top: 5, right: 5, bottom: 20, left: 30};
    var width = divWidth - margin.left - margin.right;
    var height = 130 - margin.top - margin.bottom;

    var endTime = new Date();
    var duration = 3; // In minutes
    var startTime = _startTime(endTime);

    var data = [];
    var rawData = {};

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

    return {
        tick: tick,
        updateData: updateData
    };

})();