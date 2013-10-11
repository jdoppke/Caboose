var BreakDown = (function() {

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
        .orient("left");

    var svg = d3.select(".distro-vis")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    function update(newData) {

        console.log(newData);

        // Map new types to x-domain and update x-axis
        x.domain(newData.map(function(d) { return d.type; }));
        d3.selectAll(".distro-vis .x.axis").call(xAxis);

        // Update y-domain and update y-axis
        y.domain([0, d3.max(newData, function(d) { return d.value + 5; })]);
        d3.selectAll(".distro-vis .y.axis").call(yAxis);

        svg.selectAll('.points')
            .data(newData)
            .attr("cx", function(d) { return x(d.type) + (x.rangeBand() / 2); })
            .attr("cy", function(d) { return y(d.value); });

        svg.selectAll('.points')
            .data(newData)
            .enter()
            .append("circle")
            .attr("class", "points")
            .attr("cx", function(d) { return x(d.type) + (x.rangeBand() / 2); })
            .attr("cy", function(d) { return y(d.value); })
            .attr("r", 3);

    }

    return {
        update: update
    };

})();