var map = L.map('map').setView([39.8, -98.5], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var pie_chart_size = 40; // Size of the pie chart markers

function createPieChart(data) {
    var pie = d3.layout.pie();
    var arc = d3.svg.arc().innerRadius(pie_chart_size * (1/5)).outerRadius(pie_chart_size * (2/5));
    var colors = d3.scale.category10();
    
    var svg = d3.select(document.createElement('div'))
        .append('svg')
        .attr('width', pie_chart_size)
        .attr('height', pie_chart_size);
    
    var g = svg.append('g').attr('transform', `translate(${pie_chart_size/2},${pie_chart_size/2})`);
    
    g.selectAll('path')
        .data(pie(data))
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) { return colors(i); });
    
    return svg.node().outerHTML;
}



d3.csv("data.csv", function(error, csvData) {
    d3.json("us-states.json", function(error, geoData) {
        geoData.features.forEach(function(feature) {
            var stateData = csvData.find(d => d.state === feature.properties.name);
            var pieData = stateData ? [+stateData.value1, +stateData.value2, +stateData.value3] : [10, 5, 3];
            
            var bounds = L.geoJSON(feature).getBounds();
            var center = bounds.getCenter();
            var chartHtml = createPieChart(pieData);
            
            L.marker(center, {
                icon: L.divIcon({
                    html: chartHtml,
                    className: 'pie-marker',
                    iconSize: [pie_chart_size, pie_chart_size]
                })
            }).addTo(map);
        });
        
        L.geoJSON(geoData, {
            style: {color: 'red', weight: 1, fillOpacity: 0.3}
        }).addTo(map);
    });
});