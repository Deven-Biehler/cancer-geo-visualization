import { CONFIG } from './config.js';
import { createTooltip, mouseover, mousemove, mouseleave } from './tooltip.js';

// Setup SVG and projections
const svg = d3.select("#my_dataviz");
const path = d3.geoPath();
const projection = d3.geoAlbersUsa()
  .translate([CONFIG.width / 2, CONFIG.height / 2]);

// Data and color scale
const data = d3.map();
const colorScale = d3.scaleThreshold()
  .domain(CONFIG.colorDomain)
  .range(CONFIG.colorScheme);

// Create tooltip
const tooltip = createTooltip();

// Bind tooltip to event handlers
const boundMouseover = mouseover.bind({ tooltip });
const boundMousemove = mousemove.bind({ tooltip });
const boundMouseleave = mouseleave.bind({ tooltip });

// Load data and render
d3.queue()
  .defer(d3.json, "data/us-states.json")
  .defer(d3.csv, "data/state_data.csv", function(d) { 
    data.set(d.State, +d.AvgKidneyValue); 
  })
  .await(ready);

function ready(error, topo) {
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(projection))
    .attr("fill", function (d) {
      d.total = data.get(d.properties.name) || 0;
      return colorScale(d.total);
    })
    .on("mouseover", boundMouseover)
    .on("mousemove", boundMousemove)
    .on("mouseleave", boundMouseleave);
}