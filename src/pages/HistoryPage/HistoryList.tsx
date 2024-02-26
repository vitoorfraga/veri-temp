import { Link } from 'react-router-dom'
import { Table } from '../../components/Table'
import { Badge } from '../../components/Badge'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Alert } from '../../components/Alert'
import { CountryFlag } from '../../components/CountryFlag'
import { HistoryItem } from '../../@types/HistoryItem'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useContext } from 'react'
import { WeatherForecastServiceContext } from '../../contexts/WeatherForecastContext'
import { FormatToCelsius } from '../../helpers/formatToCelsius'
import { ExternalLink } from 'lucide-react'

export const HistoryList = () => {
  const { updateLocation } = useContext(WeatherForecastServiceContext)
  const [history] = useLocalStorage('history', [])

  if (history?.length === 0) {
    return <Alert>Nenhum registro encontrado.</Alert>
  }

  const renderHistoryTableBody = history.map(
    (historyItem: HistoryItem, index: number) => {
      const formattedHistoryLocation = `${historyItem.name} - ${historyItem.state}`

      // 👉🏻 Formata a data para o formato: há 1 minuto.
      const formattedDate = formatDistanceToNow(
        new Date(historyItem.date).toISOString(),
        {
          addSuffix: true,
          locale: ptBR,
        },
      )

      // 👉🏻 Formata temperatura anterior
      const formattedTemperature = FormatToCelsius(historyItem.temperature)

      const homePageWithParamsUrl = `/?lat=${historyItem.lat}&long=${historyItem.lon}`

      const newLocation = {
        lat: historyItem.lat,
        lon: historyItem.lon,
        name: historyItem.name,
        state: historyItem.state,
        country: historyItem.country,
      }

      return (
        <Table.Row key={index}>
          <Table.Data>
            <CountryFlag countryNameInitial={historyItem.country} />
          </Table.Data>
          <Table.Data>
            <span className="truncate block">{formattedHistoryLocation}</span>
          </Table.Data>
          <Table.Data>{formattedDate}</Table.Data>
          <Table.Data className=" w-28 flex items-center justify-center">
            <Badge
              variant={formattedTemperature !== '-' ? 'outline' : 'destructive'}
            >
              {formattedTemperature}
            </Badge>
          </Table.Data>
          <Table.Data>{historyItem.service}</Table.Data>
          <Table.Data>
            <Badge variant="outline">
              <Link
                to={homePageWithParamsUrl}
                onClick={() => updateLocation(newLocation)}
                className="flex items-center gap-1.5"
              >
                Consultar Clima atual
                <ExternalLink className="size-4" />
              </Link>
            </Badge>
          </Table.Data>
        </Table.Row>
      )
    },
  )

  return (
    <Table.Root>
      <Table.Head>
        <Table.HeadRow>
          <Table.Header className="w-28">País</Table.Header>
          <Table.Header className="w-72">Localização</Table.Header>
          <Table.Header>Data</Table.Header>
          <Table.Header>Temperatura</Table.Header>
          <Table.Header>API</Table.Header>
          <Table.Header className="w-60">Ações</Table.Header>
        </Table.HeadRow>
      </Table.Head>

      <Table.Body>{renderHistoryTableBody}</Table.Body>
    </Table.Root>
  )
}
