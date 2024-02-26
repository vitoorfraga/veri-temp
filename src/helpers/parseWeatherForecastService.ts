import { AxiosResponse } from 'axios'
import { WeatherForecastServices } from '../@types/WeatherForecastServices'
import { OpenWeatherResponse } from '../@types/OpenWeatherAPI'
import { WeatherForecastType } from '../@types/WeatherForecast'
import {
  OpenMeteoGeolocationCurrent,
  OpenMeteoGeolocationDaily,
} from '../@types/OpenMeteoAPI'

const parseOpenWeatherData = (
  response: AxiosResponse,
): WeatherForecastType[] => {
  return response?.data?.list.map((weatherForecast: OpenWeatherResponse) => ({
    date: weatherForecast.dt_txt,
    temperature: {
      current: weatherForecast.main.temp,
      max: weatherForecast.main.temp_max,
      min: weatherForecast.main.temp_min,
      ThermalSensation: weatherForecast.main.feels_like,
      humidity: weatherForecast.main.humidity,
      pressure: weatherForecast.main.pressure,
    },
    wind: {
      speed: weatherForecast.wind.speed,
      deg: weatherForecast.wind.deg,
      gust: weatherForecast.wind.gust,
    },
    weather: {
      climate: weatherForecast.weather[0].main,
      description: weatherForecast.weather[0].description,
      icon: weatherForecast.weather[0].icon,
    },
  }))
}

const parseOpenMeteoData = (response: AxiosResponse): WeatherForecastType[] => {
  //  👉🏻 Extrai dados referentes ao clima atual.
  const current: OpenMeteoGeolocationCurrent = response.data.current

  //  👉🏻 Extrai dados referentes aos próximos climas.
  const daily: OpenMeteoGeolocationDaily = response.data.daily

  //  👉🏻 Cria um array de previsões do clima.
  const weatherForecastArray: WeatherForecastType[] = []

  // 👉🏻 Cria uma array com o clima dos próximos dias.
  for (let index = 0; index < daily.time.length; index++) {
    // 👉🏻 Verifica se é o dia atual.
    const isFirstForecast = index === 0

    const weatherForecast: WeatherForecastType = {
      date: daily.time[index],
      temperature: {
        current: isFirstForecast ? current.temperature_2m : null,
        max: daily.temperature_2m_max[index],
        min: daily.temperature_2m_min[index],
        ThermalSensation: null,
        humidity: isFirstForecast ? current.relative_humidity_2m : null,
        pressure: null,
      },
      wind: {
        speed: isFirstForecast
          ? current.wind_speed_10m
          : daily.wind_speed_10m_max[index],
        deg: null,
        gust: null,
      },
      weather: {
        climate: null,
        description: null,
        icon: null,
      },
    }

    // 👉🏻 Adiciona o clima do próximo dia ao array de previsões.
    weatherForecastArray.push(weatherForecast)
  }

  return weatherForecastArray
}

export const parseWeatherForecastService = (
  service: WeatherForecastServices,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any,
): WeatherForecastType[] => {
  if (service === 'openWeather') return parseOpenWeatherData(response)
  return parseOpenMeteoData(response)
}
