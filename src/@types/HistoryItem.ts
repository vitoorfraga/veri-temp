import { Location } from './Location'
import { WeatherForecastServices } from './WeatherForecastServices'

export interface HistoryItem extends Location {
  date: string
  service: WeatherForecastServices
}
