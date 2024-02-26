import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { WeatherForecastServiceContext } from '../../contexts/WeatherForecastContext'

import { PageTitle } from '../../components/PageTitle'
import { CountryFlag } from '../../components/CountryFlag'
import { Skeleton } from '../../components/Skeleton'

import axios from 'axios'

import { Location } from '../../@types/Location'

export const WeatherForecastTitle = () => {
  const [searchParams] = useSearchParams()
  const { location, updateLocation } = useContext(WeatherForecastServiceContext)

  const locationExists = location

  const [isLoading, setisLoading] = useState(false)

  const latitudeParam = searchParams.get('lat')
  const longitudeParam = searchParams.get('long')

  // 👉🏻 Faz a requisição em busca do Nome da localidade.
  const fetchLocation = () => {
    setisLoading(true)
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          appid: 'b6823c734e3592d5e1aa37686f6b4227',
          lat: latitudeParam,
          lon: longitudeParam,
          lang: 'pt_br',
          mode: 'json',
        },
      })
      .then((response) => {
        const newLocation: Location = {
          country: response.data.sys.country,
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
          state: response.data.sys.country,
          name: response.data.name,
        }

        updateLocation(newLocation)
      })
      .finally(() => setisLoading(false))
  }

  useEffect(() => {
    if (!locationExists) return fetchLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <Skeleton className="mb-9 h-[40px] max-w-64" />

  return (
    <PageTitle className="mb-9">
      {location?.country && (
        <CountryFlag countryNameInitial={location?.country} />
      )}
      {location?.name}
    </PageTitle>
  )
}
