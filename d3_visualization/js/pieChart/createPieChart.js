
/**
 * Creates a pie chart SVG as an HTML string using D3.js.
 *
 * @param {number[]} data - An array of numeric values representing the pie chart segments.
 * @returns {string} The SVG markup for the generated pie chart as a string.
 */
export function createPieChart(data, pieChartSize) {
    var pie = d3.layout.pie();
    var arc = d3.svg.arc().innerRadius(pieChartSize * (1 / 5)).outerRadius(pieChartSize * (2 / 5));
    var colors = d3.scale.category10();

    var svg = d3.select(document.createElement('div'))
        .append('svg')
        .attr('width', pieChartSize)
        .attr('height', pieChartSize);

    var g = svg.append('g').attr('transform', `translate(${pieChartSize / 2},${pieChartSize / 2})`);

    g.selectAll('path')
        .data(pie(data))
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) { return colors(i); });

    return svg.node().outerHTML;
}
