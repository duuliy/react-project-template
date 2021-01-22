import React from 'react'
import ReactDOM from 'react-dom'
import RoutersMap from '@/routers/routersMap'
import { ConfigProvider } from "antd"
import zhCN from "antd/lib/locale-provider/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
import './assets/icons'

moment.locale("zh-cn")

if (module.hot) {
  //热替换
  module.hot.accept()
}

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} componentSize="small">
      <RoutersMap />
    </ConfigProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
)



