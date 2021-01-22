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
