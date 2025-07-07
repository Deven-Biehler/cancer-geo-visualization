export function createTooltip() {
  return d3.select("body")
    .append("div")
    .style("opacity", 0)
    .style("position", "absolute")
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");
}

export function mouseover(d) {
  this.tooltip
    .style("opacity", 1);
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1);
}

export function mousemove(d) {
  const tooltipHTML = "The exact value of<br>this cell is: " + d.total;
  this.tooltip
    .html(tooltipHTML)
    .style("left", (d3.event.pageX + 10) + "px")
    .style("top", (d3.event.pageY + 10) + "px");
}

export function mouseleave(d) {
  this.tooltip
    .style("opacity", 0);
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 0.8);
}