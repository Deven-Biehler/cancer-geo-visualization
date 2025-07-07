export class DataLoader {
    async loadData() {
        try {
            const response = await fetch('data/merged_data.csv');
            const csvText = await response.text();
            
            const data = d3.csvParse(csvText, d => ({
                state: d.State,
                county: d.County,
                drinking: +d.drinking,
                obesity: +d.obesity,
                diabetes: +d.diabetes,
                heart_disease: +d.heart_disease,
                poverty: +d.poverty,
                noHealthIns: +d.noHealthIns,
                smoking: +d.smoking,
                EsoValue: +d.EsoValue,
                KidneyValue: +d.KidneyValue,
                LiverValue: +d.LiverValue,
                LungValue: +d.LungValue,
                PancreaticValue: +d.PancreaticValue,
                ProstateValue: +d.ProstateValue,
                SkinValue: +d.SkinValue,
                latitude: +d.Latitude,
                longitude: +d.Longitude
            }));
            
            const countyData = data.filter(d => !isNaN(d.smoking) && !isNaN(d.KidneyValue));
            
            // Calculate state averages
            const stateGroups = d3.nest()
                .key(d => d.state)
                .entries(countyData);
            
            const stateData = stateGroups.map(d => ({
                state: d.key,
                smoking: d3.mean(d.values, v => v.smoking),
                KidneyValue: d3.mean(d.values, v => v.KidneyValue),
                drinking: d3.mean(d.values, v => v.drinking),
                obesity: d3.mean(d.values, v => v.obesity),
                diabetes: d3.mean(d.values, v => v.diabetes),
                heart_disease: d3.mean(d.values, v => v.heart_disease),
                poverty: d3.mean(d.values, v => v.poverty),
                noHealthIns: d3.mean(d.values, v => v.noHealthIns),
                EsoValue: d3.mean(d.values, v => v.EsoValue),
                LiverValue: d3.mean(d.values, v => v.LiverValue),
                LungValue: d3.mean(d.values, v => v.LungValue),
                PancreaticValue: d3.mean(d.values, v => v.PancreaticValue),
                ProstateValue: d3.mean(d.values, v => v.ProstateValue),
                SkinValue: d3.mean(d.values, v => v.SkinValue)
            }));
            
            return { countyData, stateData };
        } catch (error) {
            throw new Error("Failed to load data: " + error.message);
        }
    }
    
    createSampleData(currentFactor, currentCancer) {
        const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'];
        
        const countyData = [];
        const stateData = [];
        
        for (let i = 0; i < states.length; i++) {
            const state = states[i];
            const factorValue = Math.random() * 30 + 10;
            const cancerValue = factorValue * 2 + Math.random() * 20;
            
            const stateEntry = { state: state };
            stateEntry[currentFactor] = factorValue;
            stateEntry[currentCancer] = cancerValue;
            stateData.push(stateEntry);
            
            // Add some county data
            for (let j = 0; j < 5; j++) {
                const countyEntry = {
                    state: state,
                    county: `County ${j}`
                };
                countyEntry[currentFactor] = factorValue + (Math.random() - 0.5) * 10;
                countyEntry[currentCancer] = cancerValue + (Math.random() - 0.5) * 20;
                countyData.push(countyEntry);
            }
        }
        
        return { countyData, stateData };
    }
}