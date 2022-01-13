import * as React from 'react'
import { Spin } from 'antd'

const Aloading = ({ loading = false }) => {
  const PrefixCls = 'Aloading'
  return (
    <div className={PrefixCls}>
      <Spin tip='' spinning={loading}></Spin>
    </div>
  )
}

export default Aloading
