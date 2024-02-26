import { WeatherForecastServices } from '../@types/WeatherForecastServices'
import { fetchOpenMeteoAPI, fetchOpenWeatherAPI } from '../lib/axios'

interface getWeatherForecastWithGeolocationParams {
  selectedAPIService: WeatherForecastServices
  geolocation: {
    lat: string
    long: string
  }
}

export const getWeatherForecastWithGeolocation = ({
  geolocation,
  selectedAPIService,
}: getWeatherForecastWithGeolocationParams) => {
  if (selectedAPIService === 'openWeather') {
    return fetchOpenWeatherAPI.get('/data/2.5/forecast?', {
      params: {
        lat: geolocation?.lat,
        lon: geolocation?.long,
      },
    })
  }
  return fetchOpenMeteoAPI.get('v1/forecast', {
    params: {
      latitude: geolocation.lat,
      longitude: geolocation.long,
    },
  })
}
