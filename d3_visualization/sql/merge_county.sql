-- Columns = State,County,Start Year,End Year,Value,StateFIPS,CountyFIPS,drinking,obesity,diabetes,heart_disease,poverty,noHealthIns,smoking
-- Cancers = Eso, Kidney, Liver, Lung, Pancreatic, Prostate, Skin
SELECT [Cancer Factor Databases].[dbo].[eso_factors].State,
        [Cancer Factor Databases].[dbo].[eso_factors].County,
        [Cancer Factor Databases].[dbo].[eso_factors].StateFIPS,
        [Cancer Factor Databases].[dbo].[eso_factors].CountyFIPS,
        [Cancer Factor Databases].[dbo].[eso_factors].drinking,
        [Cancer Factor Databases].[dbo].[eso_factors].obesity,
        [Cancer Factor Databases].[dbo].[eso_factors].diabetes,
        [Cancer Factor Databases].[dbo].[eso_factors].heart_disease,
        [Cancer Factor Databases].[dbo].[eso_factors].poverty,
        [Cancer Factor Databases].[dbo].[eso_factors].noHealthIns,
        [Cancer Factor Databases].[dbo].[eso_factors].smoking,
        [Cancer Factor Databases].[dbo].[eso_factors].Value AS EsoValue,
        [Cancer Factor Databases].[dbo].[kidney_factors].Value AS KidneyValue,
        [Cancer Factor Databases].[dbo].[liver_factors].Value AS LiverValue,
        [Cancer Factor Databases].[dbo].[lung_factors].Value AS LungValue,
        [Cancer Factor Databases].[dbo].[pancreatic_factors].Value AS PancreaticValue,
        [Cancer Factor Databases].[dbo].[prostate_factors].Value AS ProstateValue,
        [Cancer Factor Databases].[dbo].[skin_factors].Value AS SkinValue,
        [Cancer Factor Databases].[dbo].[us_county_latlng].lat AS Latitude,
        [Cancer Factor Databases].[dbo].[us_county_latlng].lng AS Longitude

FROM [Cancer Factor Databases].[dbo].[eso_factors]
FULL JOIN [Cancer Factor Databases].[dbo].[kidney_factors] 
ON [Cancer Factor Databases].[dbo].[eso_factors].CountyFIPS = [Cancer Factor Databases].[dbo].[kidney_factors].CountyFIPS
FULL JOIN [Cancer Factor Databases].[dbo].[liver_factors]
ON [Cancer Factor Databases].[dbo].[eso_factors].CountyFIPS = [Cancer Factor Databases].[dbo].[liver_factors].CountyFIPS
FULL JOIN [Cancer Factor Databases].[dbo].[lung_factors]
ON [Cancer Factor Databases].[dbo].[eso_factors].CountyFIPS = [Cancer Factor Databases].[dbo].[lung_factors].CountyFIPS
FULL JOIN [Cancer Factor Databases].[dbo].[pancreatic_factors]
ON [Cancer Factor Databases].[dbo].[eso_factors].CountyFIPS = [Cancer Factor Databases].[dbo].[pancreatic_factors].CountyFIPS
FULL JOIN [Cancer Factor Databases].[dbo].[prostate_factors]
ON [Cancer Factor Databases].[dbo].[eso_factors].CountyFIPS = [Cancer Factor Databases].[dbo].[prostate_factors].CountyFIPS
FULL JOIN [Cancer Factor Databases].[dbo].[skin_factors]
ON [Cancer Factor Databases].[dbo].[eso_factors].CountyFIPS = [Cancer Factor Databases].[dbo].[skin_factors].CountyFIPS
INNER JOIN [Cancer Factor Databases].[dbo].[us_county_latlng] ON [Cancer Factor Databases].[dbo].[kidney_factors].CountyFIPS = [Cancer Factor Databases].[dbo].[us_county_latlng].fips_code