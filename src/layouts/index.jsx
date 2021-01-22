import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Layout } from 'antd'
import Footer from './footer'
import HeaderView from './header-view'
import config from '@/config'
import { Provider } from 'react-redux'
import stores from '@stores'
import './style.less'

const Layouts = ({ children }) => {
  const history = useHistory()
  const { location } = history
  const PrefixCls='layouts'

  if (['/404', '/401', '/login'].includes(location.pathname)) {
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }

  return <Layout className={PrefixCls}>
      <Provider store={stores}>
        <HeaderView name={config.siteName} />
        {children}
        <Footer name={config.footer} />
      </Provider>
    </Layout>
    // <ConfigProvider
    //   locale={zhCN}
    //   componentSize="small"
    //   renderEmpty={customizeRenderEmpty}
    // >
    // </ConfigProvider>
  
}

export default hot(Layouts)
