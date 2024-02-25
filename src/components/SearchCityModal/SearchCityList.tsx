import { ExternalLinkIcon } from 'lucide-react'
import { WeatherForecast } from '../../@types/WeatherForecast'
import { FormatToCelsius } from '../../helpers/formatToCelsius'
import { Badge } from '../Badge'
import { Skeleton } from '../Skeleton'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useContext } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { errorHandler } from '../../helpers/errorHandler'
import { WeatherForecastServiceContext } from '../../contexts/WeatherForecastContext'
import { useSearchParams } from 'react-router-dom'
import { parseSelectedServiceResponse } from '../../helpers/parseServicesResponse'
import { Alert } from '../Alert'

interface SearchCityListProps {
  searchParam: string
}

export const SearchCityList = ({ searchParam }: SearchCityListProps) => {
  const debouncedSearchParam = useDebounce(searchParam, 600)
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchWeatherForecast, selectedAPIService } = useContext(
    WeatherForecastServiceContext,
  )

  function fetchCities(value: string) {
    if (selectedAPIService === 'openMeteo') {
      return axios
        .get('https://geocoding-api.open-meteo.com/v1/search', {
          params: {
            name: value,
            count: 10,
            language: 'pt_br',
            format: 'json',
          },
        })
        .then((response) => response)
        .catch((error: AxiosError) => {
          throw error
        })
    }

    return fetchWeatherForecast
      ?.get(``, {
        params: {
          q: value,
        },
      })
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        throw error
      })
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cities', debouncedSearchParam, selectedAPIService],
    queryFn: () => fetchCities(debouncedSearchParam),
    enabled: Boolean(debouncedSearchParam), // 👈🏻 Desabilita a chamada inicial.
  })

  // 👉🏻 Exibe Skeleton se a requisição estiver em loading.
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 mt-6 h-full">
        <Skeleton />
        <Skeleton />
      </div>
    )
  }

  // 👉🏻 Verifica se existe erro na requisição.
  const errorExists = isError
  if (errorExists) {
    const newError = error as AxiosError // 👈🏻 Converte o erro para AxiosError.
    const errorMessage = newError?.response?.status
      ? errorHandler(newError.response.status)
      : 'Erro ao buscar a previsão do tempo. Tente novamente.'
    return (
      <div className="flex justify-center items-center h-24">
        <span className="text-center block flex-1 text-zinc-600 text-sm">
          {errorMessage}
        </span>
      </div>
    )
  }

  // 👉🏻 Formata o resultado da requisição.
  const parsedData = parseSelectedServiceResponse(selectedAPIService, data)

  // 👉🏻 Verifica se a busca não retornou resultados.
  const existsResults =
    parsedData?.length === 0 && debouncedSearchParam.length > 0
  if (existsResults) {
    return (
      <Alert>
        Localidade não encontrada. Por favor, verifique o nome preenchido e
        tente novamente.
      </Alert>
    )
  }

  // 👉🏻 Atualiza os parâmetros da URL.
  const handleSelectALocation = (city: WeatherForecast) => {
    const formattedLatitude = city.coordinates.latitude.toFixed(0)
    const formattedLongitude = city.coordinates.longitude.toFixed(0)

    setSearchParams({
      lat: formattedLatitude,
      lon: formattedLongitude,
    })
    // setModalVisibility(false)
  }

  // 👉🏻 Renderiza um alerta quando o usuário não informa um parâmetro de busca.
  const showEmptySearchParamAlert = !data && !isLoading && !isError
  if (showEmptySearchParamAlert) {
    return <Alert>Informe o nome de uma localização.</Alert>
  }

  return (
    <div className="mt-6">
      <span className="text-sm font-bold text-sky-900">Resultados</span>

      <div className="flex flex-col gap-2 mt-4 ">
        {/* 👉🏻 Renderiza resultado da busca. */}
        {parsedData?.map((city: WeatherForecast) => {
          return (
            <button
              key={city.id}
              onClick={() => handleSelectALocation(city)}
              className="w-full flex items-center justify-between gap-5 border-b border-gray-200 py-2 hover:rounded-lg hover:bg-sky-50 px-2"
            >
              <span className="flex items-center gap-2">
                {/* 👉🏻 Transforma as inicias do país em minusculo e renderiza a bandeira do mesmo */}
                <img
                  src={`https://flagcdn.com/${city?.country?.toLowerCase()}.svg`}
                  width="16"
                  height="12"
                  alt={`Bandeira do país ${city?.country}`}
                />

                {/* 👉🏻 Formata e renderiza localização e país */}
                {`${city.name} | ${city.country}`}

                {/* 👉🏻 Formata e renderiza temperatura atual */}
                {city.temperature?.current && (
                  <Badge variant="outline" className="ml-3">
                    {FormatToCelsius(city?.temperature?.current)}
                  </Badge>
                )}
              </span>

              <ExternalLinkIcon size={18} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
