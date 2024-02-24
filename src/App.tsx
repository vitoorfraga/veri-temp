import { RouterProvider } from 'react-router-dom'
import { router } from './route'

import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
