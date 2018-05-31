import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch  } from 'antd'
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

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  // console.log(tableProps.dataSource)
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

  const columns = [
     {
      title: 'ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
     {
      title: '会员编号',
      dataIndex: 'capitalflow_no',
      key: 'capitalflow_no',
    },
     {
      title: '会员名',
      dataIndex: 'user_name',
      key: 'user_name',
    },
     {
      title: '充值金额',
      dataIndex: 'capitalflow_money',
      key: 'capitalflow_money',
    },
     {
      title: '支付方式',
      dataIndex: 'capitalflow_account_type',
      key: 'capitalflow_account_type',
    },
     {
      title: '充值时间',
      dataIndex: 'capitalflow_time',
      key: 'capitalflow_time',
    },
     {
      title: '充值备注',
      dataIndex: 'capitalflow_order_no',
      key: 'capitalflow_order_no',
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
      // pagination={false}
      // rowSelection={false}
      // className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.capitalflow_no}
      // components={{
      //   body: { wrapper: isMotion ? AnimateBody : CommonBody },
      // }}
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
