import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch  } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  // console.log(tableProps.dataSource)
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
      // console.log(record.refund_no)
     
    } else if (e.key === '2') {
      confirm({
        title: '确认删除?',
        onOk () {
          onDeleteItem(record.shoptype_id)
          // console.log(record)
        },
      })
    }
  }

  const columns = [
     {
      title: '退货单流水号',
      dataIndex: 'refund_no',
      key: 'refund_no',
    },
    {
      title:'订单号',
      key:'order_no',
      dataIndex: 'order_no',
    },
    {
      title:'下单时间',
      key:'order_createtime',
      dataIndex: 'order_createtime',
    },
    {
      title:'申请退单时间',
      key:'refund_time',
      dataIndex: 'refund_time',
    },
    {
      title:'发货人',
      key:'user_name',
      dataIndex: 'user_name',
    },
    {
      title:'操作人',
      key:'admin_user',
      dataIndex: 'admin_user',
    },
    
  
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '查看' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.dataIndex}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
