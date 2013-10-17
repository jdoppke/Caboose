var TL = (function() {

    function _startTime(endTimeReference) {
        return new Date(endTimeReference - (duration * 60 * 1000));
    }

    function _tick() {
        x.domain([_startTime(new Date()), new Date()]);
        xAxisSel.call(xAxis);
    }

    var divWidth = $(".new-time-line-vis").offsetWidth;
    var margin = {top: 5, right: 5, bottom: 20, left: 30};
    var width = divWidth - margin.left - margin.right;
    var height = 100 - margin.top - margin.bottom;

    var endTime = new Date();
    var duration = 3; // In minutes
    var startTime = _startTime(endTime);
    var UPDATE_INTERVAL = 500;

    var x = d3.time.scale()
        .domain([startTime, endTime])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, 5])
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

    svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    var xAxisSel = svg.selectAll(".x-axis");

    setInterval(_tick, UPDATE_INTERVAL);

    return {
    };

})();