var FileBreakDown = (function() {

    function _formatFileData(file) {

        requestCount++;

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

    var requestCount = 0;
    var reqTypeCount = {};

    var divWidth = $('.distro-vis').offsetWidth;

    var margin = {top: 10, right: 5, bottom: 20, left: 30};
    var width  = divWidth - margin.left - margin.right;
    var height = 260 - margin.top - margin.bottom;

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

    var xAxisSel = d3.selectAll(".distro-vis .x.axis");
    var yAxisSel = d3.selectAll(".distro-vis .y.axis");

    function update(file) {

        var newData = _formatFileData(file);

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