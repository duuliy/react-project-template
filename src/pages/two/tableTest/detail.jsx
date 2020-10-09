import { DetailFiedls } from '@c/index'
import { Button } from 'antd'

const DetailTest = () => {
  const PrefixCls = 'tableTestDetail'
  const fields = [
    { key: 'categoryModelName', name: '类型', showTips: false },
    { key: 'manufacturer', name: '厂商' },
    { key: 'name', name: '名称' },
    { key: 'version', name: '版本' },
    { key: 'categoryModelName1', name: '类型', showTips: false },
    { key: 'manufacturer1', name: '厂商', render: () => <Button>按钮</Button> },
    { key: 'name1', name: '名称' },
    { key: 'version1', name: '版本' },
  ]
  const data = {
    categoryModelName: 666,
    manufacturer: 666,
    name: 666,
    version: 666,
    categoryModelName1: 666,
    manufacturer1: 666,
    name1: 666,
    version1: 666,
  }
  return (
    <>
      详情
      <DetailFiedls fields={fields} data={data} column={6} />
    </>
  )
}

export default DetailTest
