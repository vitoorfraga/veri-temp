import { ArrowDown, ArrowUpIcon } from 'lucide-react'
import { WeatherForecastType } from '../../@types/WeatherForecast'
import { FormatToCelsius } from '../../helpers/formatToCelsius'
import { Badge } from '../Badge'

interface WeatherForecastCardProps {
  weatherForecast: WeatherForecastType
}
export const WeatherForecastCard = ({
  weatherForecast,
}: WeatherForecastCardProps) => {
  // 👉🏻 Formata a data para p formato: 26 de fevereiro ás 03:00.
  const formattedDate = new Date(weatherForecast?.date).toLocaleDateString(
    'pt-BR',
    {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  )

  // 👉🏻 Formata a temperatura máxima para Celsius.
  const formattedMaxTemperature = FormatToCelsius(
    weatherForecast?.temperature?.max,
  )

  // 👉🏻 Formata a temperatura mínima para Celsius.
  const formattedMinTemperature = FormatToCelsius(
    weatherForecast?.temperature?.min,
  )

  // 👉🏻 Formata a velocidade do vento para m/s.
  const formattedWindSpeed = `${weatherForecast?.wind?.speed} m/s`

  // 👉🏻 Formata a umidade para porcentagem.
  const formattedHumidity = weatherForecast.temperature.humidity || '-'

  // 👉🏻 Formata a sensação térmica para Celsius.
  const formattedThermalSensation = FormatToCelsius(
    weatherForecast.temperature.ThermalSensation,
  )

  return (
    <div>
      <span className="text-sm text-sky-800">⏱️ {formattedDate}</span>

      <div className="bg-zinc-100 p-4 shadow-md rounded-lg mt-2 hover:shadow-none transition-shadow">
        <div className="flex items-center justify-between">
          {/* 👉🏻 Temperatura máxima */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              {formattedMaxTemperature}
            </span>
            <Badge
              variant="destructive"
              className="w-6 h-6 flex items-center justify-center p-0"
            >
              <ArrowUpIcon className="size-4" />
            </Badge>
          </div>

          {/* 👉🏻 Temperatura mínima */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              {formattedMinTemperature}
            </span>
            <Badge
              variant="sky"
              className="w-6 h-6 flex items-center justify-center p-0"
            >
              <ArrowDown className="size-4" />
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <span>Umidade: {formattedHumidity}</span>
          <span>Sensação: {formattedThermalSensation}</span>
          <span>Vento: {formattedWindSpeed}</span>
        </div>
      </div>
    </div>
  )
}
