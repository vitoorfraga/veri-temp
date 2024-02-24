import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/history',
    element: <h1>History Page</h1>,
  },
])
