import { createPieChart } from "./createPieChart.js";
// import { pieChartSize } from "./config.js";
var pieChartSize = 30;

var map = L.map('map').setView([39.8, -98.5], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);



addPieCharts(pieChartSize);

function addPieCharts(pieChartSize) {
    d3.csv("data/state_data.csv", function (csvData) {
        csvData.forEach(function (StateData) {
            // skip if the feature does not have a name property
            if (!StateData) {
                return; // Skip if no data for the state
            }
            // Default values if no data is found for the state
            var pieData = StateData ? [+StateData.AvgLatitude, +StateData.AvgKidneyValue, +StateData.AvgLiverValue, +StateData.AvgLungValue, +StateData.AvgPancreaticValue, +StateData.AvgProstateValue, +StateData.AvgSkinValue] : [10, 5, 3];

            var center = [StateData.AvgLatitude, StateData.AvgLongitude];
            var chartHtml = createPieChart(pieData, pieChartSize);
            L.marker(center, {
                icon: L.divIcon({
                    html: chartHtml,
                    className: 'pie-marker',
                    iconSize: [pieChartSize, pieChartSize]
                })
            }).addTo(map);
        });
    });
}


function addLegend() {
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<h4>Cancer Factors</h4>';
        div.innerHTML += '<i style="background: #ff0000"></i> Eso<br>';
        div.innerHTML += '<i style="background: #00ff00"></i> Kidney<br>';
        div.innerHTML += '<i style="background: #0000ff"></i> Liver<br>';
        div.innerHTML += '<i style="background: #ffff00"></i> Lung<br>';
        div.innerHTML += '<i style="background: #ff00ff"></i> Pancreatic<br>';
        div.innerHTML += '<i style="background: #00ffff"></i> Prostate<br>';
        div.innerHTML += '<i style="background: #ffffff"></i> Skin<br>';
        return div;
    };

    legend.addTo(map);
}

addLegend();