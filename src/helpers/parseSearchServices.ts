import { AxiosResponse } from 'axios'
import { Location } from '../@types/Location'
import { WeatherForecastServices } from '../@types/WeatherForecastServices'
import { OpenMeteoGeolocation } from '../@types/OpenMeteoAPI'

const parseOpenWeatherGeolocation = (response: AxiosResponse): Location[] => {
  return response?.data?.map((location: Location) => ({
    name: location?.name,
    lat: location?.lat,
    lon: location?.lon,
    country: location?.country,
    state: location?.state,
  }))
}

const parseOpenMeteoGeolocation = (response: AxiosResponse): Location[] => {
  return response?.data?.results.map((location: OpenMeteoGeolocation) => ({
    name: location.name,
    lat: location.latitude,
    lon: location.longitude,
    country: location.country_code,
    state: location.admin1,
  }))
}

export const parseSearchServices = (
  service: WeatherForecastServices,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any,
): Location[] => {
  if (service === 'openWeather') return parseOpenWeatherGeolocation(response)
  return parseOpenMeteoGeolocation(response)
}
