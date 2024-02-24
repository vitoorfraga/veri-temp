import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { DefaultLayout } from '../layouts/DefaultLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />, // 👈 Layout que será aplicado em todas as páginas.
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/history',
        element: <h1>History Page</h1>,
      },
    ],
  },
])
