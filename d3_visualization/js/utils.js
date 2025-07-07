export class Utils {
    static getFactorName(factor) {
        const names = {
            'drinking': 'Drinking',
            'obesity': 'Obesity',
            'diabetes': 'Diabetes',
            'heart_disease': 'Heart Disease',
            'poverty': 'Poverty',
            'noHealthIns': 'No Health Insurance',
            'smoking': 'Smoking'
        };
        return names[factor] || factor;
    }
    
    static getCancerName(cancer) {
        const names = {
            'EsoValue': 'Esophageal',
            'KidneyValue': 'Kidney',
            'LiverValue': 'Liver',
            'LungValue': 'Lung',
            'PancreaticValue': 'Pancreatic',
            'ProstateValue': 'Prostate',
            'SkinValue': 'Skin'
        };
        return names[cancer] || cancer;
    }
}