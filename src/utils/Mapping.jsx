export const chartNameMapping = {
    0: 'Temperature',
    1: 'Humidity',
    2: 'Soil pH',
    3: 'EC',
    4: 'N',
    5: 'P',
    6: 'K',
    //air
    7: 'Temperature',
    8: 'Humidity',
    9: 'Light',
    10: 'CO2',
    //water
    11: 'Temperature',
    12: 'Water pH',
    13: 'EC',
    14: 'ORP',
}

export const feedKeyMapping = {
    0: 'temp',
    1: 'humi',
    2: 'soilph',
    3: 'ec',
    4: 'n',
    5: 'p',
    6: 'k',
    //air
    7: 'air-temp',
    8: 'air-humi',
    9: 'air-light',
    10: 'air-co2',
    //water
    11: 'water-temp',
    12: 'water-ph',
    13: 'water-ec',
    14: 'water-orp',
}

export const unitMapping = {
    0: '°C',
    1: '%',
    2: 'pH',
    3: 'ppm',
    4: '',
    5: '',
    6: '',
    //air
    7: '°C',
    8: '%',
    9: '',
    10: '',
    //water
    11: '°C',
    12: 'pH',
    13: 'ppm',
    14: 'ppm',
}

export const NameToUnitMapping = {
    //for history display
    'Soil Temperature': '°C',
    'Air Temperature': '°C',
    'Water Temperature': '°C',
    'Water pH': '',
    'Water EC': 'ppm',
    'Water ORP': 'ppm',
    'Soil Humidity': '%',
    'Air Humidity': '%',
    'Air CO2': '',
    'Air Light': '',
    'Soil pH': 'pH',
    'Soil EC': 'ppm',
    'Soil N': '',
    'Soil P': '',
    'Soil K': '',
}

export const feedKeyToNameMapping = {
    //soil
    temp: 'Soil Temperature',
    humi: 'Soil Humidity',
    soilph: 'Soil pH',
    ec: 'Soil EC',
    n: 'Soil N',
    p: 'Soil P',
    k: 'Soil K',
    //air
    'air-temp': 'Air Temperature',
    'air-humi': 'Air Humidity',
    'air-light': 'Air Light',
    'air-co2': 'Air CO2',
    //water
    'water-temp': 'Water Temperature',
    'water-ph': 'Water pH',
    'water-ec': 'Water EC',
    'water-orp': 'Water ORP',
}

export const deviceIndexToNameMapping = {
    1: 'Nutritious Liquid 1',
    2: 'Nutritious Liquid 2',
    3: 'Nutritious Liquid 3',
    4: 'Region Irrigation 1',
    5: 'Region Irrigation 2',
    6: 'Region Irrigation 3',
    7: 'Main Pump (in)',
    8: 'Main Pump (out)',
}
