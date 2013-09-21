var Timeline = (function() {

    var timePeriod = 180;  // Last 3 min
    var n          = 180 + 3;
    var duration   = 1000;
    var axis;
    var now;
    var x;

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

        axis.transition()
            .duration(duration)
            .ease('linear')
            .call(x.axis)
            .each('end', _cycle);

    }

    function start() {

        now = new Date(Date.now() - duration);

        x = d3.time.scale()
            .domain([now-(n-2) * duration, now - duration])
            .range([0, width]);

        axis = wrap.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

        _cycle();
    }

    return {
        start: start
    };

})();