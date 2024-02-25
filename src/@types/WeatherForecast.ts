export interface WeatherForecast {
  id: string
  name: string
  country: string
  coordinates: {
    latitude: number
    longitude: number
  }
  temperature?: {
    current?: number
    min: number
    max: number
  }
}
