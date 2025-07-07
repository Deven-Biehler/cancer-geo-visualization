import { Utils } from './utils.js';

export class MapRenderer {
    constructor() {
        this.svg = d3.select("#map");
        this.width = 600;
        this.height = 400;
        this.colorScale = d3.scaleSequential(d3.interpolateBlues);
        this.projection = d3.geoAlbersUsa().translate([this.width / 2, this.height / 2]).scale(700);
        this.path = d3.geoPath().projection(this.projection);
        this.tooltip = d3.select(".tooltip");
        this.loadStatesData();
    }
    
    async loadStatesData() {
        try {
            const response = await fetch('data/us-states.json');
            this.statesGeoJson = await response.json();
        } catch (error) {
            console.error("Could not load states data:", error);
        }
    }
    
    render(stateData, currentCancer) {
        this.svg.selectAll("*").remove();
        
        const extent = d3.extent(stateData, d => d[currentCancer]);
        this.colorScale.domain(extent);
        
        this.addTitle(currentCancer);
        if (this.statesGeoJson) {
            this.renderMap(stateData, currentCancer);
        } else {
            this.addPlaceholder();
        }
        this.addLegend(extent);
    }
    
    renderMap(stateData, currentCancer) {
        const dataMap = new Map(stateData.map(d => [d.state, d[currentCancer]]));
        
        this.svg.append("g")
            .selectAll("path")
            .data(this.statesGeoJson.features)
            .enter()
            .append("path")
            .attr("d", this.path)
            .attr("fill", d => {
                const value = dataMap.get(d.properties.name) || 0;
                return this.colorScale(value);
            })
            .attr("stroke", "#333")
            .attr("stroke-width", 0.5)
            .on("mouseover", (d) => {
                this.tooltip.style("opacity", 1);
                d3.select(d3.event.target).attr("stroke-width", 2);
            })
            .on("mousemove", (d) => {
                const value = dataMap.get(d.properties.name) || 0;
                this.tooltip.html(`
                    <strong>${d.properties.name}</strong><br>
                    ${Utils.getCancerName(currentCancer)}: ${value.toFixed(1)}
                `)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                this.tooltip.style("opacity", 0);
                d3.select(d3.event.target).attr("stroke-width", 0.5);
            });
    }
    
    addTitle(currentCancer) {
        this.svg.append("text")
            .attr("x", this.width / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(`${Utils.getCancerName(currentCancer)} Cancer Cases by State`);
    }
    
    addPlaceholder() {
        this.svg.append("text")
            .attr("x", this.width / 2)
            .attr("y", this.height / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "#666")
            .text("(State boundary map would be displayed here)");
    }
    
    addLegend(extent) {
        const legendWidth = 200;
        const legendHeight = 20;
        const legend = this.svg.append("g")
            .attr("transform", `translate(${this.width - legendWidth - 20}, ${this.height - 50})`);
        
        const legendScale = d3.scaleLinear()
            .domain(extent)
            .range([0, legendWidth]);
        
        const legendAxis = d3.axisBottom(legendScale).ticks(5);
        
        legend.append("g")
            .attr("transform", `translate(0, ${legendHeight})`)
            .call(legendAxis);
        
        legend.append("text")
            .attr("x", legendWidth / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Cancer Cases");
    }
}