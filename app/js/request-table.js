/*
 * Might be more efficient to do this with native DOM API (append/pop)
 * or d3, need to do some perf testing...
 */

var Table = (function(){

    var ROW_COUNT = 10;

    var tBody = $('.request-table-body');

    function _cell(text) {
        return '<td>' + text + '</td>';
    }

    function update(data) {

        var newRow = '<tr>' +
                     _cell(data['date']) +
                     _cell(data['ip']) +
                     _cell(data['url']) +
                     _cell(data['method']) +
                     _cell(data['serve-time']) +
                     _cell(data['bytes']) +
                     '</tr>';

        var currentTable = tBody.innerHTML;
        tBody.innerHTML = newRow + currentTable;

        var rows = tBody.getElementsByTagName('tr');

        if (rows.length >= ROW_COUNT) {
            rows[rows.length-1].remove();
        }

    }

    return {
        update: update
    };

})();