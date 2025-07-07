SELECT [Cancer Factor Databases].[dbo].[merged_data].State AS State,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].EsoValue AS FLOAT)) AS AvgEsoValue,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].KidneyValue AS FLOAT)) AS AvgKidneyValue,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].LiverValue AS FLOAT)) AS AvgLiverValue,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].LungValue AS FLOAT)) AS AvgLungValue,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].PancreaticValue AS FLOAT)) AS AvgPancreaticValue,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].ProstateValue AS FLOAT)) AS AvgProstateValue,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].SkinValue AS FLOAT)) AS AvgSkinValue,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].drinking AS FLOAT)) AS AvgDrinking,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].obesity AS FLOAT)) AS AvgObesity,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].diabetes AS FLOAT)) AS AvgDiabetes,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].heart_disease AS FLOAT)) AS AvgHeartDisease,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].poverty AS FLOAT)) AS AvgPoverty,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].noHealthIns AS FLOAT)) AS AvgNoHealthIns,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].smoking AS FLOAT)) AS AvgSmoking,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].Latitude AS FLOAT)) AS AvgLatitude,
    AVG(CAST([Cancer Factor Databases].[dbo].[merged_data].Longitude AS FLOAT)) AS AvgLongitude
FROM [Cancer Factor Databases].[dbo].[merged_data]
GROUP BY [Cancer Factor Databases].[dbo].[merged_data].State