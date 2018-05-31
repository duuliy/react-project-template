import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch,Row, Col ,Button ,Pagination  } from 'antd'
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
  console.log(tableProps)
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record) => {
    // if (e.key === '1') {
    //   onEditItem(record)
    // } else if (e.key === '2') {
    //   confirm({
    //     title: '确认删除?',
    //     onOk () {
    //       onDeleteItem(record.shoptype_id)
    //       // console.log(record)
    //     },
    //   })
    // }
    onEditItem(record)
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
  
    // {
    //   title: '操作',
    //   key: 'operation',
    //   width: 100,
    //   render: (text, record) => {
    //     return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
    //   },
    // },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }
 const order_status_arr = [
   '待付款','交易中','交易完成','交易失败','待收货','退款中','退款失败','交易取消','审核中','退款成功','已删除'
 ]
  return (

    <div>
      
      
    {
          tableProps.dataSource.map((item,i)=>{
           
            return  <div key={i} >
              <Row style={{background:"#eee",height:'30px',lineHeight:'30px'}}>
                <Col span={6}>&emsp;订单号：{item.order_no}</Col>
                <Col span={6}>下单时间：{item.order_createtime}</Col>
                <Col span={4}>收货人：{item.user_name}</Col>
                <Col span={6}>手机：{item.user_phone_num}</Col>
              </Row>
              <Row style={{background:"#fff",height:'100px',lineHeight:'100px',margin:'10px 0'}}>
                <Col span={4}>
                  <div style={{background:'url('+imgSrc+item.shop_img+') no-repeat',backgroundSize:'cover',width:'90%',height:'100px'}}></div>
                </Col>
                <Col span={8}>{item.shop_title}</Col>
                <Col span={2}>￥{item.order_money}</Col>
                <Col span={2}>{item.order_count}</Col>
                <Col span={2}>￥{item.order_paymoney}</Col>
                <Col span={2}>
                  {order_status_arr[item.order_status]}
                </Col>
                <Col span={4}>
                <Button type="primary" onClick={e => handleMenuClick(item.order_no)} >查看</Button>
                </Col>
              </Row>
            </div>

          })
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
