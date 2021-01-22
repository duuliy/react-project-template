
import { lazy } from 'react'

export default [
  { path: '/', component: lazy(() => import('@/pages/app-test')), tag: 'app-test' },
  { path: '/401', component: lazy(() => import('@/pages/error-pages/401')), tag: '401' },
  { path: '/404', component: lazy(() => import('@/pages/error-pages/404')), tag: '404' },
]