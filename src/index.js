import React from 'react'
import ReactDOM from "react-dom/client"
import RoutersMap from '@/routers/routersMap'
import { ConfigProvider } from "antd"
import zhCN from "antd/lib/locale-provider/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
require('./assets/icons')  //在webpack5这里import的话会被tree sharking

moment.locale("zh-cn")

if (module.hot) {
  //热替换
  module.hot.accept()
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ConfigProvider locale={zhCN} componentSize="small">
    <RoutersMap />
  </ConfigProvider>
)



