const { createPieChart } = require("./createPieChart");

var map = L.map('map').setView([39.8, -98.5], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

export var pie_chart_size = 40; // Size of the pie chart markers

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