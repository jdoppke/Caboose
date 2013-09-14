var Distribution = (function() {

    var divWidth = $('.distro-vis').offsetWidth;

    var margin = {top: 0, right: 0, bottom: 0, left: 0};
    var width  = divWidth - margin.left - margin.right;
    var height = 30 - margin.top - margin.bottom;

    var colors = d3.scale.category10();

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, 100]);

    var SVG = d3.select('.distro-vis')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    function update(data) {

        var leftPos = 0;

        var rect = SVG.selectAll('rect')
            .data(data);

        rect.enter()
            .append('rect')
            .attr('width', function(d) { return x(d['value']); })
            .attr('height', 20)
            .attr('transform', function(d) {
                var tran = 'translate(' + leftPos + ',0)';
                leftPos = leftPos += x(d['value']);
                return tran;
            })
            .attr('fill', function(d, i) { return colors(i); });

        leftPos = 0;

        rect
            .transition()
            .attr('width', function(d) { return x(d['value']); })
            .attr('height', 20)
            .attr('transform', function(d) {
                var tran = 'translate(' + leftPos + ',0)';
                leftPos = leftPos += x(d['value']);
                return tran;
            })
            .attr('fill', function(d, i) { return colors(i); });

    }

    return {
        update: update
    };

})();