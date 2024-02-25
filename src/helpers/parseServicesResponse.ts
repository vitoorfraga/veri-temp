import { AxiosResponse } from 'axios'
import { WeatherForecastServices } from '../@types/WeatherForecastServices'
import { OpenMeteoCity } from '../@types/OpenMeteoAPI'
import { OpenWeatherLocation } from '../@types/OpenWeatherAPI'
import { WeatherForecast } from '../@types/WeatherForecast'

const parseOpenWeatherData = (data: OpenWeatherLocation): WeatherForecast[] => {
  return [
    {
      id: data?.name,
      name: data?.name,
      country: data?.sys.country,
      temperature: {
        max: data?.main.temp_max,
        min: data?.main.temp_min,
        current: data?.main.temp,
      },
      coordinates: {
        latitude: data?.coord.lat,
        longitude: data?.coord.lon,
      },
    },
  ]
}

const parseOpenMeteoData = (response: AxiosResponse): WeatherForecast[] => {
  return response?.data?.results?.map((city: OpenMeteoCity) => ({
    id: city?.id,
    name: city?.name,
    country: city?.country_code,
    temperature: {
      max: null,
      min: null,
      current: null,
    },
    coordinates: {
      latitude: city?.latitude,
      longitude: city?.longitude,
    },
  }))
}

export const parseSelectedServiceResponse = (
  service: WeatherForecastServices,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any,
): WeatherForecast[] => {
  if (service === 'openWeather') return parseOpenWeatherData(response)
  return parseOpenMeteoData(response)
}
