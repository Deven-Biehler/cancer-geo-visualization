const { pie_chart_size } = require(".");

export function createPieChart(data) {
    var pie = d3.layout.pie();
    var arc = d3.svg.arc().innerRadius(pie_chart_size * (1 / 5)).outerRadius(pie_chart_size * (2 / 5));
    var colors = d3.scale.category10();

    var svg = d3.select(document.createElement('div'))
        .append('svg')
        .attr('width', pie_chart_size)
        .attr('height', pie_chart_size);

    var g = svg.append('g').attr('transform', `translate(${pie_chart_size / 2},${pie_chart_size / 2})`);

    g.selectAll('path')
        .data(pie(data))
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) { return colors(i); });

    return svg.node().outerHTML;
}
