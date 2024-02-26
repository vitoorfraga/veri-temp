export interface WeatherForecastType {
  date: string
  temperature: {
    current: number | null
    max: number | null
    min: number | null
    ThermalSensation: number | null
    humidity: number | null
    pressure: number | null
  }
  wind: {
    speed: number | null
    deg: number | null
    gust: number | null
  }
  weather: {
    climate: string | null
    description: string | null
    icon: string | null
  }
}
