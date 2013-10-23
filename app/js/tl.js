var TL = (function() {

    function _startTime(endTimeReference) {
        return new Date(endTimeReference - (duration * 60 * 1000));
    }

    function _formatRawData(rawData) {
        var newData = [];
        for (var prop in rawData) {
            newData.unshift({
                "date": new Date(prop),
                "req" : rawData[prop]
            });
        }
        return newData;
    }

    function tick() {
        if (!(new Date() in rawData)) {
            rawData[new Date()] = 0;
        }

        data = _formatRawData(rawData);

        x.domain([_startTime(new Date()), new Date()]);
        xAxisSel.call(xAxis);

        y.domain([0, d3.max(data, function(d) { return d.req; })]);
        yAxisSel.call(yAxis);

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
    var height = 100 - margin.top - margin.bottom;

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

    var path = svg.append("g")
        .append("path")
        .attr("class", "line")
        .attr("d", lineFunc(data));

    return {
        tick: tick,
        updateData: updateData
    };

})();