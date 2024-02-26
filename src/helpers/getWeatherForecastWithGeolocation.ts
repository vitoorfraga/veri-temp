import { WeatherForecastServices } from '../@types/WeatherForecastServices'
import { fetchOpenMeteoAPI, fetchOpenWeatherAPI } from '../lib/axios'

interface getWeatherForecastWithGeolocationParams {
  selectedAPIService: WeatherForecastServices
  geolocation: {
    lat: string
    long: string
  }
}

// 👉🏻 Realiza a requisição para a API de previsão do tempo com base na geolocalização.
export const getWeatherForecastWithGeolocation = ({
  geolocation,
  selectedAPIService,
}: getWeatherForecastWithGeolocationParams) => {
  // 👉🏻 Verifica qual serviço de previsão do tempo foi selecionado.
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
