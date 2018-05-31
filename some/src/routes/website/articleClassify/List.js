import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch,Input  } from 'antd'
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
  console.log(tableProps)
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除?',
        onOk () {
          onDeleteItem(record.id)
          // console.log(record)
        },
      })
    }
  }

  const columns = [
     {
      title: '分类id',
      dataIndex: 'typeid',
      key: 'typeid',
    },
    {
      title:'分类名称',
      key:'typename',
      dataIndex: 'typename',
      // render:(shoptype_status)=>{
      //   return  <Switch checked={Boolean(shoptype_status)} disabled />
      // }
    },
    {
      title:'链接',
      key:'friendurl',
      dataIndex: 'friendurl',
      // render:(is_index)=>{
      //   return  <Switch checked={Boolean(is_index)}  disabled/>
      // }
    },
    {
      title:'是否启用',
      key:'friendstatus',
      dataIndex: 'friendstatus',
      render:(friendstatus,record)=>{
        return  <Switch checked={Boolean(friendstatus)}/>
      }
    },
  
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
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
