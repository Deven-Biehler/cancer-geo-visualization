import { addPieLegend } from "./addPieLegend.js";
import { createPieChart } from "./createPieChart.js";

export function addPieCharts(pieChartSize, map) {
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
    addPieLegend(map);
}
