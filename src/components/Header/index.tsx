import { Link } from 'react-router-dom'
import { SelectField } from '../SelectField'
import { SelectItem } from '../SelectItem'
import { SearchCityModal } from '../SearchCityModal'
import { useContext } from 'react'
import { WeatherForecastServiceContext } from '../../contexts/WeatherForecastContext'
import { WeatherForecastServices } from '../../@types/WeatherForecastServices'

export const Header = () => {
  const { selectedAPIService, updateAPIService } = useContext(
    WeatherForecastServiceContext,
  )

  const handleSelectService = (value: WeatherForecastServices) => {
    updateAPIService(value)
  }

  return (
    <header className="h-16 border-b border-zinc-200 px-14 flex items-center justify-between">
      <div className="flex items-center gap-11">
        <h1 className="text-sky-800 text-xl font-bold">VeriTemp</h1>
        <SearchCityModal />
      </div>

      <div className="flex items-center gap-5">
        <Link to="/history" className="text-sky-800 font-medium">
          Histórico
        </Link>

        <SelectField
          placeholder={selectedAPIService}
          onValueChange={handleSelectService}
        >
          <SelectItem value="openWeather">Open Weather</SelectItem>
          <SelectItem value="openMeteo">Open Meteor</SelectItem>
        </SelectField>
      </div>
    </header>
  )
}
