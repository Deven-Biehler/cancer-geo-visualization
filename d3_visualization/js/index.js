import { createPieChart } from "./createPieChart.js";
import { pieChartSize } from "./config.js";


var map = L.map('map').setView([39.8, -98.5], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);



addPieCharts(pieChartSize);

function addPieCharts(pieChartSize) {
    d3.csv("data/data.csv", function (csvData) {
        d3.json("data/us-states.json", function (geoData) {
            geoData.features.forEach(function (feature) {
                var stateData = csvData.find(d => d.state === feature.properties.name);
                // Default values if no data is found for the state
                var pieData = stateData ? [+stateData.value1, +stateData.value2, +stateData.value3] : [10, 5, 3];

                var bounds = L.geoJSON(feature).getBounds();
                var center = bounds.getCenter();
                var chartHtml = createPieChart(pieData, pieChartSize);

                L.marker(center, {
                    icon: L.divIcon({
                        html: chartHtml,
                        className: 'pie-marker',
                        iconSize: [pieChartSize, pieChartSize]
                    })
                }).addTo(map);
            });
            
            // Add the GeoJSON layer to the map
            L.geoJSON(geoData, {
                style: { color: 'red', weight: 1, fillOpacity: 0.3 }
            }).addTo(map);
        });
    });
}
