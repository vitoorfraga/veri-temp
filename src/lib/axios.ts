import axios from 'axios'

export const fetchOpenWeatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    apiKey: 'b6823c734e3592d5e1aa37686f6b4227',
    lang: 'pt_br',
    units: 'metric',
  },
})

export const fetchOpenMeteoAPI = axios.create({
  baseURL: 'https://api.open-meteo.com',
  params: {
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    hourly: `temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,visibility,wind_speed_10m`,
    daily:
      'temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max',
    timezone: 'America/Sao_Paulo',
    wind_speed_unit: 'ms',
  },
})
