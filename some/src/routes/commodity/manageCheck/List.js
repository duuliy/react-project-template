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
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e,status) => {
    if (e.key === '1') {
      onEditItem(status)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除?',
        onOk () {
          onDeleteItem(record.shoptype_id)
        },
      })
    }
  }
  const order_status_arr = [
    '待审核','审核成功 ','审核失败 '
  ]
  const columns = [
     {
      title: 'ID',
      dataIndex: 'squat_id',
      key: 'squat_id',
    },
     {
      title: '商品名称',
      dataIndex: 'squat_title',
      key: 'squat_title',

    },
    //  {
    //   title: '发布商家',
    //   dataIndex: 'squat_no',
    //   key: 'squat_no',
    // },
    //  {
    //   title: '发布时间',
    //   dataIndex: 'user_name',
    //   key: 'user_name',
    // },
    //  {
    //   title: '价格',
    //   dataIndex: 'squat_createtime',
    //   key: 'squat_createtime',
    // },
    // {
    //   title: '库存',
    //   dataIndex: 'squat_createtime',
    //   key: 'squat_createtime',
    // },
    // {
    //   title: '是否平台代选',
    //   dataIndex: 'squat_createtime',
    //   key: 'squat_createtime',
    // },
    // {
    //   title: '是否平台代选',
    //   dataIndex: 'squat_createtime',
    //   key: 'squat_createtime',
    // },
    //  {
    //   title: '审核状态',
    //   dataIndex: '',
    //   key: 'order_status',
    //   render:(e)=>{
    //     return <span>
    //       {order_status_arr[e.squat_status ]}
    //     </span>
    //   }
    // },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        { 
          return <span style={{cursor:'pointer',color:'#1890ff'}} onClick={e => onEditItem(record)} >{
            record.squat_status == 0 ? '去审核' : '查看'

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
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.squat_id}
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
