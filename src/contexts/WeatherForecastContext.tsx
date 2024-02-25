import axios, { AxiosInstance } from 'axios'
import { createContext, ReactNode, useState } from 'react'
import { WeatherForecastServices } from '../@types/WeatherForecastServices'

interface WeatherForecastServiceProps {
  selectedAPIService: WeatherForecastServices
  updateAPIService: (service: WeatherForecastServices) => void
  fetchWeatherForecast?: AxiosInstance
}

// 👉🏻 Valores para inicializar o contexto.
const DEFAULT_VALUE: WeatherForecastServiceProps = {
  selectedAPIService: 'openWeather',
  updateAPIService: () => {
    return null
  },
}

// 👉🏻 Cria o contexto.
const WeatherForecastServiceContext =
  createContext<WeatherForecastServiceProps>(DEFAULT_VALUE)

// 👉🏻 Contexto que controla qual Serviço de Previsão será utilizado.
const WeatherForecastServiceProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [selectedAPIService, setSelectedAPIService] =
    useState<WeatherForecastServices>(DEFAULT_VALUE.selectedAPIService)

  // 👉🏻 Atualiza o serviço que será utilizado nas requisições.
  const updateAPIService = (service: WeatherForecastServices) => {
    setSelectedAPIService(service)
  }

  const configureServices = (service: WeatherForecastServices) => {
    const services = {
      openWeather: {
        endPoint: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          apiKey: 'b6823c734e3592d5e1aa37686f6b4227',
          lang: 'pt_br',
          units: 'metric',
        },
      },
      openMeteo: {
        endPoint: 'https://api.open-meteo.com/v1',
        params: {
          language: 'pt_br',
        },
      },
    }

    return services[service]
  }

  // 👉🏻 Realiza a requisição utilizando o serviço selecionado.
  const service = configureServices(selectedAPIService)
  const fetchWeatherForecast = axios.create({
    baseURL: service.endPoint,
    params: service.params,
  })

  return (
    <WeatherForecastServiceContext.Provider
      value={{ selectedAPIService, updateAPIService, fetchWeatherForecast }}
    >
      {children}
    </WeatherForecastServiceContext.Provider>
  )
}

export { WeatherForecastServiceProvider, WeatherForecastServiceContext }
