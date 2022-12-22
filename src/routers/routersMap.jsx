import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import routers from './index'
import Layouts from '@/layouts'
import { Aloading } from '@/components'

const App = () => {
  return (
    <Layouts>
      <Suspense fallback={<Aloading loading={true} />}>
        <Outlet />
      </Suspense>
    </Layouts>
  )
}


const RoutersMap = () => {
  return (
    <Router>
      {/* <Routes element={<App />}> */}
      <Routes>
        {/* <Route path="/login" exact component={ Login } /> */}
        <Route element={<App />} >
          {
            routers.map((item, index) => <Route key={index} path={item.path} element={item.element} />)
          }
          {/* <Redirect to="/login" /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default RoutersMap