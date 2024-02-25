export interface OpenWeatherLocation {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain?: {
    '1h': number
  }
  clouds: {
    all: number
  }
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}