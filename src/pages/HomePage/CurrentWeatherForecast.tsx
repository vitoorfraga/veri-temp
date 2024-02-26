import { CurrentWeatherCard } from '../../components/CurrentWeatherCard'
import { WeatherForecastCard } from '../../components/WeatherForecastCard'
import { useQuery } from '@tanstack/react-query'
import { HomePageLoading } from './loading'
import { useContext } from 'react'
import { WeatherForecastServiceContext } from '../../contexts/WeatherForecastContext'
import { Alert } from '../../components/Alert'
import { parseWeatherForecastService } from '../../helpers/parseWeatherForecastService'
import { getWeatherForecastWithGeolocation } from '../../helpers/getWeatherForecastWithGeolocation'

interface CurrentWeatherForecastProps {
  geolocation: {
    lat: string
    long: string
  }
}

export const CurrentWeatherForecast = ({
  geolocation,
}: CurrentWeatherForecastProps) => {
  const { selectedAPIService } = useContext(WeatherForecastServiceContext)

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['weatherForest', geolocation, selectedAPIService],
    queryFn: () =>
      getWeatherForecastWithGeolocation({ geolocation, selectedAPIService }),
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
            return (
              <WeatherForecastCard weatherForecast={forecast} key={index} />
            )
          })}
        </div>
      </section>
    </>
  )
}
