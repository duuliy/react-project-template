import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch,Tabs   } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import { request, config } from 'utils'
const { api } = config
const { uploadfile,imgSrc } = api
const { confirm } = Modal
const TabPane = Tabs.TabPane;

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  // console.log(tableProps.status)
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e,status) => {
    if (e.key === '1') {
      onEditItem(status)
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
  const order_status_arr = [
    '待付款','交易中','交易完成','交易失败','待收货','退款中','退款失败','交易取消','审核中','退款成功','已删除'
  ]
  const columns = [
     {
      title: '时间',
      dataIndex: 'order_createtime',
      key: 'order_createtime',
    },
     {
      title: '订单号',
      dataIndex: 'order_no',
      key: 'order_no',
    },
     {
      title: '支付单号',
      dataIndex: 'capitalflow_no',
      key: 'capitalflow_no',
    },
     {
      title: '状态',
      dataIndex: '',
      key: 'order_status',
      render:(e)=>{
        return <span>
          {order_status_arr[e.order_status ]}
        </span>
      }
    },
     {
      title: '支付人',
      dataIndex: 'user_name',
      key: 'user_name',
    },
     {
      title: '收款人',
      dataIndex: 'order_username',
      key: 'order_username',
    },
     {
      title: '金额(元)',
      dataIndex: 'order_paymoney',
      key: 'order_paymoney',
    },
   

  
   
  ]

  const AnimateBody = (props) => {
    
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Tabs defaultActiveKey ={'1'} activeKey={tableProps.status ? String(tableProps.status) : '1'} onChange={(e)=>{onEditItem(e)}}>
    <TabPane tab="全部" key="1">
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.order_createtime}
      />
    </TabPane>
    <TabPane tab="交易中" key="2">
    <Table
        {...tableProps}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.order_createtime}
      />
    </TabPane>
    <TabPane tab="退款成功" key="3">
    <Table
        {...tableProps}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.order_createtime}
      />
    </TabPane>
    <TabPane tab="交易成功" key="4">
    <Table
        {...tableProps}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.order_createtime}
      />
    </TabPane>
  </Tabs>
  
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
