import { ExternalLinkIcon } from 'lucide-react'
import { Skeleton } from '../Skeleton'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useContext } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { errorHandler } from '../../helpers/errorHandler'
import { WeatherForecastServiceContext } from '../../contexts/WeatherForecastContext'
import { Alert } from '../Alert'
import { parseSearchServices } from '../../helpers/parseSearchServices'
import { Location } from '../../@types/Location'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { HistoryItem } from '../../@types/HistoryItem'
import { CountryFlag } from '../CountryFlag'
import { getWeatherForecastWithGeolocation } from '../../helpers/getWeatherForecastWithGeolocation'
import { parseWeatherForecastService } from '../../helpers/parseWeatherForecastService'
import { toast } from 'sonner'

interface SearchCityListProps {
  searchParam: string
  toggleModalVisibility: () => void
}

export const SearchCityList = ({
  searchParam,
  toggleModalVisibility,
}: SearchCityListProps) => {
  const debouncedSearchParam = useDebounce(searchParam, 600)

  const { fetchWeatherForecast, selectedAPIService, updateLocation } =
    useContext(WeatherForecastServiceContext)
  const [history, setHistory] = useLocalStorage('history', [])

  const navigate = useNavigate()

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
      ?.get(`geo/1.0/direct`, {
        params: {
          q: value,
          limit: 10,
        },
      })
      .then((response) => response)
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
        {/* 👉🏻 Renderiza 7 Rows do skeleton */}
        {Array.from({ length: 7 }, (_, index) => (
          <Skeleton key={index} />
        ))}
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
  const parsedData = parseSearchServices(selectedAPIService, data)

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
  const handleSelectALocation = async (city: Location) => {
    const formattedLatitude = city.lat.toFixed(2)
    const formattedLongitude = city.lon.toFixed(2)

    const geolocation = {
      lat: formattedLatitude,
      long: formattedLongitude,
    }

    // 👉🏻 Adiciona a localização no histórico.
    let newHistory: HistoryItem = {
      ...city,
      date: new Date().toLocaleString(),
      service: selectedAPIService,
    }

    try {
      const response = await getWeatherForecastWithGeolocation({
        geolocation,
        selectedAPIService,
      })

      const parsedResponse = parseWeatherForecastService(
        selectedAPIService,
        response,
      )

      const currentTemperature = parsedResponse[0].temperature.current

      newHistory = {
        ...newHistory,
        temperature: currentTemperature,
      }
    } catch {
      toast.error(
        'Não foi possível salvar a temperatura atual no seu histórico.',
      )
    }

    setHistory([...history, newHistory])

    // 👉🏻 Atualiza a localização no contexto.
    updateLocation(city)

    // 👉🏻 Desativa a modal.
    toggleModalVisibility()

    // 👉🏻 Realiza o redirect para a página HomePage e insere os parametros de busca.
    const homePageWithParamsUrl = `/?lat=${formattedLatitude}&long=${formattedLongitude}`
    return navigate(homePageWithParamsUrl)
  }

  // 👉🏻 Renderiza um alerta quando o usuário não informa um parâmetro de busca.
  const showEmptySearchParamAlert = !data && !isLoading && !isError
  if (showEmptySearchParamAlert) {
    return <Alert>Informe o nome de uma localização.</Alert>
  }

  return (
    <div className="mt-6">
      <span className="text-sm font-bold text-sky-900">Resultados</span>

      <div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-64 pr-2">
        {/* 👉🏻 Renderiza resultado da busca. */}
        {parsedData?.map((location: Location, index: number) => {
          return (
            <button
              key={index}
              onClick={() => handleSelectALocation(location)}
              className="w-full flex items-center justify-between gap-5 border-b border-gray-200 py-2 hover:rounded-lg hover:bg-sky-50 px-2"
            >
              <span className="flex items-center gap-2">
                <CountryFlag
                  width={16}
                  height={12}
                  countryNameInitial={location.country}
                />

                {/* 👉🏻 Formata e renderiza localização e país */}
                {`${location.name} - ${location.state}`}
              </span>

              <ExternalLinkIcon size={18} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
