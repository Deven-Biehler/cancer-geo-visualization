import { Utils } from './utils.js';

export class RegressionPlot {
    constructor() {
        this.svg = d3.select("#regression");
        this.margin = {top: 20, right: 30, bottom: 60, left: 60};
        this.width = 500 - this.margin.left - this.margin.right;
        this.height = 400 - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
        this.tooltip = d3.select(".tooltip");
    }
    
    render(countyData, currentFactor, currentCancer) {
        this.g.selectAll("*").remove();
        
        const validData = countyData.filter(d => !isNaN(d[currentFactor]) && !isNaN(d[currentCancer]));
        
        const xScale = this.setupXScale(validData, currentFactor);
        const yScale = this.setupYScale(validData, currentCancer);
        
        this.addAxes(xScale, yScale, currentFactor, currentCancer);
        this.addDataPoints(validData, xScale, yScale, currentFactor, currentCancer);
        this.addRegressionLine(validData, xScale, yScale, currentFactor, currentCancer);
    }
    
    setupXScale(data, currentFactor) {
        const extent = d3.extent(data, d => d[currentFactor]);
        return d3.scaleLinear()
            .domain(extent)
            .range([0, this.width]);
    }
    
    setupYScale(data, currentCancer) {
        const extent = d3.extent(data, d => d[currentCancer]);
        return d3.scaleLinear()
            .domain(extent)
            .range([this.height, 0]);
    }
    
    addAxes(xScale, yScale, currentFactor, currentCancer) {
        this.g.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(xScale));
        
        this.g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale));
        
        this.g.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margin.left)
            .attr("x", 0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(`${Utils.getCancerName(currentCancer)} Cancer Cases`);
        
        this.g.append("text")
            .attr("class", "axis-label")
            .attr("transform", `translate(${this.width / 2}, ${this.height + this.margin.bottom})`)
            .style("text-anchor", "middle")
            .text(`${Utils.getFactorName(currentFactor)} (%)`);
    }
    
    addDataPoints(data, xScale, yScale, currentFactor, currentCancer) {
        this.g.selectAll(".data-point")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "data-point")
            .attr("cx", d => xScale(d[currentFactor]))
            .attr("cy", d => yScale(d[currentCancer]))
            .attr("r", 3)
            .on("mouseover", (d) => {
                this.tooltip.style("opacity", 1);
                d3.select(d3.event.target).style("opacity", 1);
            })
            .on("mousemove", (d) => {
                this.tooltip.html(`
                    <strong>${d.state}, ${d.county}</strong><br>
                    ${Utils.getFactorName(currentFactor)}: ${d[currentFactor].toFixed(1)}%<br>
                    ${Utils.getCancerName(currentCancer)}: ${d[currentCancer].toFixed(1)}
                `)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                this.tooltip.style("opacity", 0);
                d3.select(d3.event.target).style("opacity", 0.7);
            });
    }
    
    addRegressionLine(data, xScale, yScale, currentFactor, currentCancer) {
        const regression = this.calculateRegression(data, currentFactor, currentCancer);
        
        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));
        
        this.g.append("path")
            .datum(regression.line)
            .attr("class", "regression-line")
            .attr("d", line);
        
        this.g.append("text")
            .attr("x", this.width - 10)
            .attr("y", 20)
            .attr("text-anchor", "end")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text(`R² = ${regression.rSquared.toFixed(3)}`);
    }
    
    calculateRegression(data, xVar, yVar) {
        const n = data.length;
        const sumX = d3.sum(data, d => d[xVar]);
        const sumY = d3.sum(data, d => d[yVar]);
        const sumXY = d3.sum(data, d => d[xVar] * d[yVar]);
        const sumXX = d3.sum(data, d => d[xVar] * d[xVar]);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        const xExtent = d3.extent(data, d => d[xVar]);
        const line = [
            { x: xExtent[0], y: slope * xExtent[0] + intercept },
            { x: xExtent[1], y: slope * xExtent[1] + intercept }
        ];
        
        const yMean = sumY / n;
        const ssRes = d3.sum(data, d => Math.pow(d[yVar] - (slope * d[xVar] + intercept), 2));
        const ssTot = d3.sum(data, d => Math.pow(d[yVar] - yMean, 2));
        const rSquared = 1 - (ssRes / ssTot);
        
        return { line, rSquared };
    }
}