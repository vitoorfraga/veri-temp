import { PageTitle } from '../../components/PageTitle'
import { HistoryList } from './HistoryList'

export const HistoryPage = () => {
  return (
    <main className="p-14 space-y-12">
      <PageTitle>Histórico</PageTitle>

      <HistoryList />
    </main>
  )
}
