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
  const operation_status_arr = [
      '待审核 ','审核通过' ,'审核不通过' ,'已打款'
  ]

  const operation_status = [
    '去审核 ','打款' ,'查看详情' ,'查看详情'
  ]

  //   1 待审核
  //  2 打款
  // 3,4  详情
  const columns = [
     {
      title: 'ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
     {
      title: '会员名',
      dataIndex: 'user_name',
      key: 'user_name',
    },
     {
      title: '提现金额',
      dataIndex: 'capitalflow_money',
      key: 'capitalflow_money',
    },
     {
      title: '到账金额',
      dataIndex: 'capitalflow_real_money',
      key: 'capitalflow_real_money',
    },
     {
      title: '提现时间',
      dataIndex: 'capitalflow_time',
      key: 'capitalflow_time',
    },
     {
      title: '提现状态',
      dataIndex: '',
      key: 'operation_status',
      render:(e)=>{

        return <span>{ 
          operation_status_arr[e.operation_status - 1]
        }</span>

      }
    },
     {
      title: '处理人',
      dataIndex: 'operation_name',
      key: 'operation_name',
    },
     {
      title: '处理时间',
      dataIndex: 'operation_time',
      key: 'operation_time',
    },
    
     {
      title: '备注',
      dataIndex: 'capitalflow_remark',
      key: 'capitalflow_remark',
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        { 
          return <span style={{cursor:'pointer',color:'#1890ff'}} onClick={e => onEditItem(record)} >{
            operation_status[record.operation_status-1]

          }</span>
 
        }
      
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
