var Distribution = (function() {

    // TODO: Need to add labels and make colors match globally.

    var divWidth = $('.distro-vis').offsetWidth;

    var margin = {top: 0, right: 0, bottom: 0, left: 0};
    var width  = divWidth - margin.left - margin.right;
    var height = 30 - margin.top - margin.bottom;

    var barHeight = 20;

    var colors = d3.scale.category10();

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, 100]);
/*
    var threshold = d3.scale.threshold()
        .domain([0,100]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .tickSize(13)
        .tickFormat(function(d) { return d['value']; });
*/
    var SVG = d3.select('.distro-vis')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    var rectGroup = SVG.append('g')
        .attr('class', 'rect-group');

    var textGroup = SVG.append('g');

//    SVG.call(xAxis);

    function update(data) {

        console.log(data);

        var leftPos = 0;
        var textLeft = 0;

        var text = textGroup.selectAll('text')
            .data(data);

        text
            .attr('transform', function(d) {
             var halfWidth = x(d['value']) / 2;
             var tran = 'translate(' + (textLeft + halfWidth) + ',30)';
                textLeft = textLeft += x(d['value']);
                return tran;
        }).text(function(d) { return d['type']; });

        text.enter()
            .append('text')
            .attr('transform', function(d) {
             var halfWidth = x(d['value']) / 2;
             var tran = 'translate(' + (textLeft + halfWidth) + ',30)';
                textLeft = textLeft += x(d['value']);
                return tran;
        }).text(function(d) { return d['type']; });

        var rect = rectGroup.selectAll('rect')
            .data(data);

        rect
            .attr('width', function(d) { return x(d['value']); })
            .attr('height', barHeight)
            .attr('transform', function(d) {
                var tran = 'translate(' + leftPos + ',0)';
                leftPos = leftPos += x(d['value']);
                return tran;
            })
            .attr('fill', function(d, i) { return colors(i); });

        rect.enter()
            .append('rect')
            .attr('width', function(d) { return x(d['value']); })
            .attr('height', barHeight)
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