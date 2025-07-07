export const CONFIG = {
  width: +d3.select("#my_dataviz").attr("width"),
  height: +d3.select("#my_dataviz").attr("height"),
  colorDomain: [1, 2, 4, 8, 16, 32],
  colorScheme: d3.schemeBlues[7]
};