import axios, { AxiosInstance } from 'axios'
import { createContext, ReactNode, useState } from 'react'
import { WeatherForecastServices } from '../@types/WeatherForecastServices'
import { Location } from '../@types/Location'

interface WeatherForecastServiceProps {
  selectedAPIService: WeatherForecastServices
  updateAPIService: (service: WeatherForecastServices) => void
  fetchWeatherForecast?: AxiosInstance
  location?: Location | null
  updateLocation: (location: Location) => void
}

// 👉🏻 Valores para inicializar o contexto.
const DEFAULT_VALUE: WeatherForecastServiceProps = {
  selectedAPIService: 'openWeather',
  updateAPIService: () => {
    return null
  },
  updateLocation: () => {
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
  const [location, setLocation] = useState(DEFAULT_VALUE.location)

  // 👉🏻 Atualiza o serviço que será utilizado nas requisições.
  const updateAPIService = (service: WeatherForecastServices) => {
    setSelectedAPIService(service)
  }

  // 👉🏻 Atualiza a localização.
  const updateLocation = (location: Location) => {
    setLocation(location)
  }

  const configureServices = (service: WeatherForecastServices) => {
    const services = {
      openWeather: {
        endPoint: 'https://api.openweathermap.org/',
        params: {
          apiKey: 'b6823c734e3592d5e1aa37686f6b4227',
          lang: 'pt_br',
          units: 'metric',
        },
      },
      openMeteo: {
        endPoint: 'https://api.open-meteo.com',
        params: {
          current:
            'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
          hourly: `temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,visibility,wind_speed_10m`,
          daily:
            'temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max',
          timezone: 'America/Sao_Paulo',
          wind_speed_unit: 'ms',
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
      value={{
        selectedAPIService,
        updateAPIService,
        fetchWeatherForecast,
        location,
        updateLocation,
      }}
    >
      {children}
    </WeatherForecastServiceContext.Provider>
  )
}

export { WeatherForecastServiceProvider, WeatherForecastServiceContext }
