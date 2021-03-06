var BrowserBreakDown = (function() {

    function _incrementBrowsers(userAgent) {
        var browser = identifyBrowser(userAgent);

        // If a browser is not identified, ignore for now.
        // Maybe show this later in UI?
        if (browser !== null) {
            browserHits++;

            if (browser in browserCount) {
                browserCount[browser]++;
            } else {
                browserCount[browser] = 1;
            }
        }

        var tally = [];
        for (var browser in browserCount) {
            tally.push({
                "type": browser,
                "value": (browserCount[browser]/browserHits) * 100
            });
        }

        return tally;
    }

    function _makeXaxis() {
        return d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);
    }

    function _formatTransformStr(d) {
        var xCoor = x(d.type) + (x.rangeBand() / 2);
        var yCoor = y(d.value) - 2;
        return "translate("+xCoor+","+yCoor+")";
    }

    var browserCount = {};
    var browserHits  = 0;

    var divWidth = $('.browser-vis').offsetWidth;

    var margin = {top: 10, right: 5, bottom: 20, left: 30};
    var width  = divWidth - margin.left - margin.right;
    var height = 50 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeBands([0, width], .2);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, 100]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(5)
        .orient("left");
/*
    var svg = d3.select(".browser-vis")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add grid lines
    var yGrid = svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0, 0)")
        .call(_makeXaxis().tickSize(-width, 0, 0).tickFormat(""));

    // Add x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var xAxisSel = d3.selectAll(".browser-vis .x.axis");
    var yAxisSel = d3.selectAll(".browser-vis .y.axis");
*/
    function update(UA) {

        var newData = _incrementBrowsers(UA);

        // Map new types to x-domain and update x-axis
        x.domain(newData.map(function(d) { return d.type; }));
        xAxisSel.call(xAxis);

        // Update y-domain and update y-axis
        y.domain([0, d3.max(newData, function(d) { return d.value; })]);
        yAxisSel.call(yAxis);

        // Update grid lines
        yGrid.call(_makeXaxis().tickSize(-width, 0, 0).tickFormat(""));

        // Select, update, draw rect
        var rectSel = svg.selectAll(".bars").data(newData);

        rectSel
            .transition()
            .attr("x", function(d) { return x(d.type); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", function(d) { return x.rangeBand(); })
            .attr("height", function(d) { return height-y(d.value); });

        rectSel
            .enter()
            .append("rect")
            .attr("class", "bars")
            .attr("x", function(d) { return x(d.type); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", function(d) { return x.rangeBand(); })
            .attr("height", function(d) { return height-y(d.value); });

        // Select, update, draw labels
        var valSel = svg.selectAll(".bar-values").data(newData);

        valSel
            .transition()
            .attr("transform", _formatTransformStr)
            .text(function(d) { return Math.round(d.value) + '%'; });

        valSel
            .enter()
            .append("text")
            .attr("class", "bar-values")
            .attr("transform", _formatTransformStr)
            .text(function(d) { return Math.round(d.value) + '%'; });

    }

    return {
        update: update
    };

})();