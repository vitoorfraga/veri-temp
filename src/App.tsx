import { RouterProvider } from 'react-router-dom'
import { router } from './route'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WeatherForecastServiceProvider } from './contexts/WeatherForecastContext'
import { Toaster } from 'sonner'

function App() {
  const queryClient = new QueryClient()

  return (
    <WeatherForecastServiceProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

      <Toaster />
    </WeatherForecastServiceProvider>
  )
}

export default App
