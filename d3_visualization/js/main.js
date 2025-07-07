import { DataLoader } from './dataLoader.js';
import { MapRenderer } from './mapRenderer.js';
import { RegressionPlot } from './regressionPlot.js';

class Application {
    constructor() {
        this.currentFactor = 'smoking';
        this.currentCancer = 'KidneyValue';
        
        this.dataLoader = new DataLoader();
        this.mapRenderer = new MapRenderer();
        this.regressionPlot = new RegressionPlot();
        
        this.initializeEventListeners();
        this.loadData();
    }
    
    initializeEventListeners() {
        d3.select("#factorSelect").on("change", () => {
            this.currentFactor = document.getElementById("factorSelect").value;
            this.updateVisualization();
        });
        
        d3.select("#cancerSelect").on("change", () => {
            this.currentCancer = document.getElementById("cancerSelect").value;
            this.updateVisualization();
        });
    }
    
    async loadData() {
        try {
            const data = await this.dataLoader.loadData();
            this.countyData = data.countyData;
            this.stateData = data.stateData;
            this.updateVisualization();
        } catch (error) {
            console.error("Error loading data:", error);
            this.createSampleData();
        }
    }
    
    createSampleData() {
        const sampleData = this.dataLoader.createSampleData(this.currentFactor, this.currentCancer);
        this.countyData = sampleData.countyData;
        this.stateData = sampleData.stateData;
        this.updateVisualization();
    }
    
    updateVisualization() {
        this.mapRenderer.render(this.stateData, this.currentCancer);
        this.regressionPlot.render(this.countyData, this.currentFactor, this.currentCancer);
    }
}

// Initialize the application
new Application();