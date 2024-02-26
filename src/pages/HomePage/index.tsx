import { useSearchParams } from 'react-router-dom'

import { PageTitle } from '../../components/PageTitle'

import { CurrentWeatherForecast } from './CurrentWeatherForecast'

import { WeatherForecastTitle } from './WeatherForecastTitle'
import { ExternalLink } from '../../components/ExternalLink'

export const HomePage = () => {
  const [searchParams] = useSearchParams()

  const latitudeParam = searchParams.get('lat')
  const longitudeParam = searchParams.get('long')

  // 👉🏻 Verifica se latitude e longitude existem.
  const latitudeAndLongitudeExists = Boolean(latitudeParam && longitudeParam)

  // 👉🏻 Se latitude e longitude não existirem, exibe mensagem.
  if (!latitudeAndLongitudeExists) {
    return (
      <section className="px-14 space-y-6  h-full mt-48 w-fit ">
        <PageTitle className="mt-12">Bem-vindo(a) ao VeriTemp ☀️</PageTitle>
        <p>
          Parece que você ainda não selecionou uma localização. Por favor,
          utilize o botão localizado no cabeçalho.
        </p>

        <div className="flex gap-2">
          <ExternalLink href="https://github.com/vitoorfraga?tab=repositories">
            Github
          </ExternalLink>

          <ExternalLink href="https://www.linkedin.com/in/vitoorfraga/">
            Linkedin
          </ExternalLink>

          <ExternalLink href="https://www.youtube.com/@vitoorfraga">
            Youtube
          </ExternalLink>
        </div>
      </section>
    )
  }

  // 👉🏻 Se latitude e longitude existirem, exibe previsão do clima.

  const geolocation = {
    lat: latitudeParam || '',
    long: longitudeParam || '',
  }
  return (
    <main className="p-14">
      {/* <PageTitle className="mb-9">

      </PageTitle> */}
      <WeatherForecastTitle />
      <CurrentWeatherForecast geolocation={geolocation} />
    </main>
  )
}
