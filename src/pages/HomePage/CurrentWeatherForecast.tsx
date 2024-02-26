import { CurrentWeatherCard } from '../../components/CurrentWeatherCard'
import { WeatherForecastCard } from '../../components/WeatherForecastCard'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { HomePageLoading } from './loading'
import { useContext } from 'react'
import { WeatherForecastServiceContext } from '../../contexts/WeatherForecastContext'
import { Alert } from '../../components/Alert'
import { parseWeatherForecastService } from '../../helpers/parseWeatherForecastService'

interface CurrentWeatherForecastProps {
  geolocation: {
    lat: string
    long: string
  }
}

export const CurrentWeatherForecast = ({
  geolocation,
}: CurrentWeatherForecastProps) => {
  const { selectedAPIService, fetchWeatherForecast } = useContext(
    WeatherForecastServiceContext,
  )

  function getWeatherForecastWithGeolocation() {
    if (selectedAPIService === 'openWeather') {
      return fetchWeatherForecast
        ?.get('/data/2.5/forecast?', {
          params: {
            lat: geolocation?.lat,
            lon: geolocation?.long,
          },
        })
        .then((response) => {
          return response
        })
        .catch((error: AxiosError) => {
          console.log(error)
          throw error
        })
    }
    return fetchWeatherForecast
      ?.get('v1/forecast', {
        params: {
          latitude: geolocation.lat,
          longitude: geolocation.long,
        },
      })
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['weatherForest', geolocation, selectedAPIService],
    queryFn: () => getWeatherForecastWithGeolocation(),
    enabled: Boolean(geolocation), // 👈🏻 Desabilita a chamada inicial
  })

  // 👉🏻 Exibe Skeleton se a requisição estiver em loading.
  if (isLoading || isFetching) return <HomePageLoading />

  // 👉🏻 Exibe mensagem de erro se a requisição falhar.
  if (isError || error)
    return <Alert>Não foi possível processar sua requisição.</Alert>

  // 👉🏻 Formata o resultado da requisição.
  const parsedData =
    !isLoading && parseWeatherForecastService(selectedAPIService, data)

  const currentWeatherForecast = parsedData[0]

  const upcomingWeatherForecasts = parsedData.slice(1)

  return (
    <>
      <section>
        <CurrentWeatherCard currentWeatherForecast={currentWeatherForecast} />

        <div className="grid gap-9 mt-6 grid-cols-4 ">
          {upcomingWeatherForecasts.map((forecast, index) => {
            console.log(forecast)
            return (
              <WeatherForecastCard weatherForecast={forecast} key={index} />
            )
          })}
        </div>
      </section>
    </>
  )
}
