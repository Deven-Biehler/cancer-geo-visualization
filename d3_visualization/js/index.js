import { addPieCharts } from "./pieChart/addPieCharts.js";
// import { addChoropleth } from "./choropleth/addChoropleth.js";

var pieChartSize = 30;


// // Initialize the map
// export var map = L.map('map').setView([39.8, -98.5], 4);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


// fetch('data/us-states.json')
//  .then(response => response.json())
//  .then(data => {
//    const washingtonState = data.features.find(state => state.properties.name === 'California');
//    L.geoJSON(washingtonState, {
//      style: { color: 'blue', fillColor: 'blue', fillOpacity: 1 }
//    }).addTo(map);
//  });

//  fetch('data/us-states.json')
//  .then(response => response.json())
//  .then(data => {
//     data.features.forEach(feature => {
//         L.geoJSON(feature, {
//             style: { color: 'black', fillColor: 'white', fillOpacity: 0.5 },
//             onEachFeature: function (feature, layer) {
//                 layer.bindPopup(feature.properties.name);
//             }
//         }).addTo(map);
//     });
//  });


// Add pie charts to the map
// addPieCharts(pieChartSize, map);

// Add choropleth to the map
// addChoropleth(map);

// The svg
var svg = d3.select("#my_dataviz"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([1, 2, 4, 8, 16, 32])
  .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "data/us-states.json")
  .defer(d3.csv, "data/state_data.csv", function(d) { data.set(d.State, +d.AvgKidneyValue); })
  .await(ready);

var Tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .style("position", "absolute")
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")



// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
    Tooltip
        .style("opacity", 1)
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
var mousemove = function(d) {
    console.log(d);
    var tooltipHTML = "The value of this cell is: " + d.total;
    Tooltip
        .html(tooltipHTML)
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY + 10) + "px")
    }
var mouseleave = function(d) {
    Tooltip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

function ready(error, topo) {

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.properties.name) || 0;
        return colorScale(d.total);
      })
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
    }