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
      title: '客服名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
     {
      title: 'QQ',
      dataIndex: 'customer_qq',
      key: 'customer_qq',
    },


  
    {
      title: '操作',
      key: 'operation',
      width: 160,
      render: (text, record) => {
        // return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
        return <span style={{cursor:'pointer'}} onClick={()=>{onEditItem(tableProps.dataSource)}}>修改</span>
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
      rowKey={record => record.id}
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
