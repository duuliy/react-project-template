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
      title: '编号',
      dataIndex: 'contentid',
      key: 'contentid',
    },
    {
      title:'文章标题',
      key:'contentname',
      dataIndex: 'contentname',
      // render:(shoptype_status)=>{
      //   return  <Switch checked={Boolean(shoptype_status)} disabled />
      // }
    },
    {
      title:'文章分类',
      key:'typeid',
      dataIndex: 'typeid',
      // render:(shoptype_status)=>{
      //   return  <Switch checked={Boolean(shoptype_status)} disabled />
      // }
    },
    {
      title:'是否启用',
      key:'contentstatus',
      dataIndex: 'contentstatus',
      render:(contentstatus,record)=>{
        return  <Switch checked={Boolean(contentstatus)}/>
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
      rowKey={record => record.contentid}
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
