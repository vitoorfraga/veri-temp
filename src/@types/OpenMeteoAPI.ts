export interface OpenMeteoGeolocation {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation: number
  feature_code: string
  country_code: string
  admin1_id: number
  admin2_id: number
  timezone: string
  population: number
  country_id: number
  country: string
  admin1: string
  admin2: string
}

export interface OpenMeteoGeolocationCurrent {
  time: string
  relative_humidity_2m: number
  temperature_2m: number
  temperature_2m_max: number
  temperature_2m_min: number
  apparent_temperature_max: number
  apparent_temperature_min: number
  wind_speed_10m: number
}

export interface OpenMeteoGeolocationDaily {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  wind_speed_10m_max: number[]
}
