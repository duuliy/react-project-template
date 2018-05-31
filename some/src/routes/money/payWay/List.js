import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch,Card, Icon, Avatar,Button    } from 'antd'
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
const { Meta } = Card;
const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps,settingFun
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

  const AnimateBody = (props) => {
    
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    

     tableProps.dataSource.map((item,i)=>{

      return  <Card
        key={i}
        bordered={false}
        style={{ width: 300,display:'inline-block',marginRight:'20px' }}
        cover={<div style={{background:'url('+imgSrc+item.pay_img_url+') no-repeat',backgroundSize:'cover',width:'100%',height:'120px'}}></div>}
        // 
      >
        <div style={{textAlign:'center'}}>
          <Switch style={{marginRight:'30px',position:'relative',top:'-2px'}} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked onChange={(e)=>{onEditItem(e,item)}} />
          {/* <Button size="small" style={{marginRight:'30px'}}  type="primary" onClick={()=>{console.log(3)}}>删除</Button> */}
          <Button size="small" type="primary" onClick={()=>{settingFun(item)}}>设置</Button>
        </div>
      
      </Card>
     })
     
    
   
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  settingFun: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
