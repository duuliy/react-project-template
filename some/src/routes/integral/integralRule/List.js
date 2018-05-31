import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch,Button   } from 'antd'
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
  // console.log(tableProps)
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
      title: '分类名称',
      dataIndex: 'shoptype_name',
      key: 'shoptype_name',
    },
    {
      title:'状态',
      key:'shoptype_status',
      dataIndex: 'shoptype_status',
      render:(shoptype_status)=>{
        return  <Switch checked={Boolean(shoptype_status)} disabled />
      }
    },
    {
      title:'是否首页显示',
      key:'is_index',
      dataIndex: 'is_index',
      render:(is_index)=>{
        return  <Switch checked={Boolean(is_index)}  disabled/>
      }
    },
    {
      title:'是否展示在搜索栏',
      key:'is_search',
      dataIndex: 'is_search',
      render:(is_search)=>{
        return  <Switch checked={Boolean(is_search)}  disabled/>
      }
    },
    {
      title:'*是否展示到首页最新',
      key:'is_new',
      dataIndex: 'is_new',
      render:(is_new)=>{
        return  <Switch checked={Boolean(is_new)}  disabled/>
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
    <div>
      {
        tableProps.dataSource.length != 0 ? 
         <div className={styles.item}>
            <div>
              <span>1，出售一个商品，按照这个商品的{tableProps.dataSource[0].shop}% 获取积分</span>
              <div>
                <Switch  checked={Boolean(tableProps.dataSource[0].is_open_shop)} disabled />
                <span>&nbsp;是否启动</span>
              </div>
            </div>
            <div>
              <span>1，签到第一天送{tableProps.dataSource[0].one_day}积分；连续签到第二天{tableProps.dataSource[0].two_day}积分，第三天{tableProps.dataSource[0].three_day}积分，从第四天开始连续签到每次获取{tableProps.dataSource[0].other_day}积分</span>
              <div>
              <Switch checked={Boolean(tableProps.dataSource[0].is_open_sign)} disabled />
                <span>&nbsp;是否启动</span>
              </div>
             
            </div>
            <div>
              <span>1，邀请一个好友注册成功送{tableProps.dataSource[0].invite}积分，邀请好友不设上限</span>
              <div>
              <Switch  checked={Boolean(tableProps.dataSource[0].is_open_invite)} disabled />
                <span>&nbsp;是否启动</span>
              </div>
             
            </div>
            <Button type="primary" onClick={(e)=>{onEditItem(tableProps.dataSource)}}>编辑</Button>
         </div>
        : ''
      }
       
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
