SELECT *
FROM [Cancer Factor Databases].[dbo].[kidney_factors]
INNER JOIN [Cancer Factor Databases].[dbo].[us_county_latlng] ON [Cancer Factor Databases].[dbo].[kidney_factors].CountyFIPS = [Cancer Factor Databases].[dbo].[us_county_latlng].fips_code