var BreakDown = (function() {

    function _makeXaxis() {
        return d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);
    }

    var divWidth = $('.distro-vis').offsetWidth;

    var margin = {top: 7, right: 5, bottom: 20, left: 30};
    var width  = divWidth - margin.left - margin.right;
    var height = 100 - margin.top - margin.bottom;

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

    var svg = d3.select(".distro-vis")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add grid lines
    var yGrid = svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0, " + 0 + ")")
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

    var xAxisSel = d3.selectAll(".distro-vis .x.axis");
    var yAxisSel = d3.selectAll(".distro-vis .y.axis");

    function update(newData) {

        // Map new types to x-domain and update x-axis
        x.domain(newData.map(function(d) { return d.type; }));
        xAxisSel.call(xAxis);

        // Update y-domain and update y-axis
        y.domain([0, d3.max(newData, function(d) { return d.value; })]);
        yAxisSel.call(yAxis);

        yGrid.call(_makeXaxis().tickSize(-width, 0, 0).tickFormat(""));

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
    }
    

    return {
        update: update
    };

})();