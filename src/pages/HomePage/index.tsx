import { useSearchParams } from 'react-router-dom'

import { PageTitle } from '../../components/PageTitle'

import { CurrentWeatherForecast } from './CurrentWeatherForecast'

import { WeatherForecastTitle } from './WeatherForecastTitle'

export const HomePage = () => {
  const [searchParams] = useSearchParams()

  const latitudeParam = searchParams.get('lat')
  const longitudeParam = searchParams.get('long')

  // 👉🏻 Verifica se latitude e longitude existem.
  const latitudeAndLongitudeExists = Boolean(latitudeParam && longitudeParam)

  // 👉🏻 Se latitude e longitude não existirem, exibe mensagem.
  if (!latitudeAndLongitudeExists) {
    return (
      <section className="px-14 space-y-6">
        <PageTitle className="mt-12">Procure por uma localização</PageTitle>
        <p>Utilize o botão acima para procurar por uma cidade ☀️.</p>
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
