var Timeline = (function() {

    var timePeriod = 180;  // Last 3 min
    var n          = 180 + 3;
    var duration   = 1000;
    var data       = d3.range(n).map(function() { return 0; });
    var axis;
    var now;
    var x;

    var line;
    var path;

    var requestCount = 0;

    var margin = { top: 6, right: 0, bottom: 20, left: 0 };
    var width  = $('.time-line-vis').offsetWidth;
    var height = 120;

    var y = d3.scale.linear()
        .range([height, 0]);

    var wrap = d3.select('.time-line-vis')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    wrap.append('defs')
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', width)
        .attr('height', height);

    function _cycle() {

        now = new Date();

        x.domain([now-(n-2) * duration, now - duration]);
        y.domain([0, d3.max(data, function(d) { return d; })]);

        data.push(requestCount);

        wrap.select('.line')
            .attr('d', line)
            .attr('transform', null);

        path.transition()
            .duration(duration)
            .ease('linear')
            .attr('transform', 'translate(' + x(now-(n-1) * duration) + ')');

        axis.transition()
            .duration(duration)
            .ease('linear')
            .call(x.axis)
            .each('end', _cycle);

        data.shift();
        requestCount = 0;

    }

    function start() {

        now = new Date(Date.now() - duration);

        // Initialize line, this will have to be updated to properly reflect
        // the time the request was made (not using now).
        line = d3.svg.line()
            .interpolate('basis')
            .x(function(d, i) { return x(now - (n - 1 - i) * duration); })
            .y(function(d, i) { return y(d); });

        path = wrap.append('g')
            .attr('clip-path', 'url(#clip)')
            .append('path')
            .data([data])
            .attr('class', 'line');

        x = d3.time.scale()
            .domain([now-(n-2) * duration, now - duration])
            .range([0, width]);

        axis = wrap.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

        _cycle();
    }

    function incrementReqCount() {
        requestCount++;
    }

    return {
        start: start,
        incrementReqCount: incrementReqCount
    };

})();