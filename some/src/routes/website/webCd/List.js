import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch,Input  } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import { config } from 'utils'
const { api } = config
const { imgSrc } =api
const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps,list
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
     {
      title: '广告名称',
      dataIndex: 'adname',
      key: 'adname',
    },
    {
      title:'广告图片',
      key:'adimg',
      dataIndex: 'adimg',
      render:(adimg)=>{
        return  <img src={adimg} style={{height:"38px"}}/>
      }
    },
    {
      title:'广告链接',
      key:'adurl',
      dataIndex: 'adurl',
      // render:(is_index)=>{
      //   return  <Switch checked={Boolean(is_index)}  disabled/>
      // }
    },
    {
      title:'广告位置',
      key:'adwz',
      dataIndex: 'adwz',
      // render:(is_index)=>{
      //   return  <Switch checked={Boolean(is_index)}  disabled/>
      // }
    },
    {
      title:'展示端口',
      key:'adport',
      dataIndex: 'adport',
      // render:(is_index)=>{
      //   return  <Switch checked={Boolean(is_index)}  disabled/>
      // }
    },
    {
      title:'排序',
      key:'adsort',
      dataIndex: 'adsort',
      // render:(is_index)=>{
      //   return  <Switch checked={Boolean(is_index)}  disabled/>
      // }
    },
    {
      title:'是否启用',
      key:'adstatus',
      dataIndex: 'adstatus',
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
  const data=[]
  if(list!=undefined){
    for(let i=0;i<list.length;i++){
      let adwz
      if(list[i].adwz==0){
        adwz="请选择广告位置"
      }else if(list[i].adwz==1){
        adwz="顶部"
      }else if(list[i].adwz==2){
        adwz="轮播图"
      }else if(list[i].adwz==3){
        adwz="左1广告"
      }else if(list[i].adwz==4){
        adwz="左2广告"
      }else if(list[i].adwz==5){
        adwz="页中广告"
      }else if(list[i].adwz==6){
        adwz="页内广告"
      }
      let adport
      if(list[i].adport==0){
        adport="pc"
      }else{
        adport="mc"
      }
      data.push({
        id:list[i].id,
        adname:list[i].adname,
        adimg:imgSrc+list[i].adimg,
        adurl:list[i].adurl,
        adwz:adwz,
        adport:adport,
        adsort:list[i].adsort,
        adstatus:list[i].adstatus,
      })

    }
  }



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
      dataSource={data}
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
