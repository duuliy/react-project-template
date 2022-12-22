
import { lazy } from 'react'

const AppTest = lazy(() => import('@/pages/app-test'))
const Page401 = lazy(() => import('@/pages/error-pages/401'))
const Page404 = lazy(() => import('@/pages/error-pages/404'))

export default [
  { path: '/', element: <AppTest />, tag: 'app-test' },
  { path: '401', element: <Page401/>, tag: '401' },
  { path: '404', element: <Page404/>, tag: '404' },
]