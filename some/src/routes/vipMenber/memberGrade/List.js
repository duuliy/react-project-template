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
      title: '等级名称',
      dataIndex: 'lv_name',
      key: 'lv_name',
    },
     {
      title: '积分下限',
      dataIndex: 'lv_min_score',
      key: 'lv_min_score',
    },
     {
      title: '积分上限',
      dataIndex: 'lv_max_score',
      key: 'lv_max_score',
    },
   
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        { 
          return <span style={{cursor:'pointer',color:'#1890ff'}} onClick={e => onEditItem(record,tableProps.dataSource)} >修改</span>
          // console.log(record.authentication_status)
          // return <DropOption onMenuClick={e => handleMenuClick(record, e,record.authentication_status)} 
          // menuOptions={{ key: '1', name: 'authentication_status.authentication_status == 0 ? "未审核 " : (authentication_status.authentication_status == 1 ? "审核通过" : "审核失败")' }} />
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
      pagination={false}
      // rowSelection={false}
      // className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.shoptype_id}
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
