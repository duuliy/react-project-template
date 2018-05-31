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
    if (e.key === 'one') {
      onEditItem(record)
    } else if (e.key === 'two') {
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
      dataIndex: 'shop_id',
      key: 'shop_id',
    },
     {
      title: '商品标题',
      dataIndex: 'shop_title',
      key: 'shop_title',
    },
     {
      title: '商家名称',
      dataIndex: 'user_name',
      key: 'user_name',
    },
     {
      title: '商品编号',
      dataIndex: 'shop_no',
      key: 'shop_no',
    },
     {
      title: '发布时间',
      dataIndex: 'shop_createtime',
      key: 'shop_createtime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.shop_createtime - b.shop_createtime,
    },
     {
      title: '喜欢数',
      dataIndex: 'shop_renqi',
      key: 'shop_renqi',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.shop_renqi - b.shop_renqi,
    },
    {
      title: '价格',
      dataIndex: 'shop_markedprice',
      key: 'shop_markedprice',
    },
    {
      title:'上架状态',
      key:'shop_status',
      dataIndex: 'shop_status',
      render:(shop_status)=>{
        return  <Switch checked={Boolean(shop_status)} disabled />
      }
    },

    {
      title: '排序',
      dataIndex: 'shop_sort',
      key: 'shop_sort',
    },
    {
      title: '数量',
      dataIndex: 'shop_count',
      key: 'shop_count',
    },
  

    {
      title: '商品类型',
      dataIndex: 'shoptype_name',
      key: 'shoptype_name',
    },


    {
      title: '操作',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: 'one', name: '更新' }, { key: 'two', name: '删除' }]} />
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
