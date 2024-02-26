import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

import { FormatToCelsius } from '../../helpers/formatToCelsius'
import { WeatherForecastType } from '../../@types/WeatherForecast'
import { Badge } from '../Badge'

interface CurrentWeatherCardProps {
  currentWeatherForecast: WeatherForecastType
}

export const CurrentWeatherCard = ({
  currentWeatherForecast,
}: CurrentWeatherCardProps) => {
  // 👉🏻 Formata a temperatura atual para Celsius.
  const formattedCurrentTemperature = FormatToCelsius(
    currentWeatherForecast?.temperature.current,
  )

  // 👉🏻 Formata a temperatura máxima para Celsius.
  const formattedMaxTemperature = FormatToCelsius(
    currentWeatherForecast?.temperature?.max,
  )

  // 👉🏻 Formata a temperatura mínima para Celsius.
  const formattedMinTemperature = FormatToCelsius(
    currentWeatherForecast?.temperature?.min,
  )

  // 👉🏻 Formata a umidade.
  const formattedHumidity = `${currentWeatherForecast?.temperature?.humidity}%`

  // 👉🏻 Formata a sensação térmica.
  const formattedThermalSensation = FormatToCelsius(
    currentWeatherForecast?.temperature?.ThermalSensation,
  )

  // 👉🏻 Formata a velocidade do vento.
  const formattedWindSpeed = `${currentWeatherForecast?.wind.speed} m/s`

  return (
    <>
      <span className="text-base font-bold text-zinc-950 mb-4 block">
        Atual
      </span>
      <div className="bg-sky-900 rounded-lg w-full h-80 p-6 flex flex-col justify-between">
        <div className="text-sky-50">
          <Badge variant="success">
            {currentWeatherForecast.weather.description?.toUpperCase()}
          </Badge>

          <span className="text-8xl font-bold">
            {formattedCurrentTemperature}
          </span>

          <div className="flex flex-col gap-2 mt-4">
            <span className="flex items-center gap-2">
              <ArrowUpIcon className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600" />
              Máxima {formattedMaxTemperature}
            </span>
            <span className="flex items-center gap-2">
              <ArrowDownIcon className="w-4 h-4 flex items-center justify-center rounded-full bg-sky-600" />
              Mínima {formattedMinTemperature}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-11 text-zinc-300">
          <span>Umidade: {formattedHumidity}</span>
          <span>Sensação Térmica: {formattedThermalSensation}</span>
          <span>Velocidade do vento: {formattedWindSpeed}</span>
        </div>
      </div>
    </>
  )
}
