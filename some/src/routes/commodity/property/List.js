import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch,Input,Tree,Badge,Dropdown,Icon,Menu    } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import Utils from 'utils'
import {config } from 'utils'
const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,getLabel,ap1All2 } = api

const { confirm } = Modal
const TreeNode = Tree.TreeNode;
const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

const List = ({
  onDeleteItem, onEditItem, isMotion, location,list,getChild,childList,allList, ...tableProps
}) => {
  location.query = queryString.parse(location.search)



  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除?',
        okText:"删除",
        cancelText:"取消",
        onOk () {
          onDeleteItem(record.property_id)
        },
      })
    }
  }
  
  //  总的表格体系
  const columns = [
     {
      title: '排序',
      dataIndex: 'property_id',
      key: 'parentdata.property_id',
    },
    {
      title:'属性名称',
      key:'property_name',
      dataIndex: 'property_name',
    },
    {
      title:'状态',
      key:'property_status',
      dataIndex: 'property_status',
      render:(property_status,record)=>{
        return  <Switch checked={Boolean(property_status)}/>
      }
    },
    {
      title:'是否首页显示',
      key:'is_index',
      dataIndex: 'is_index',
      render:(is_index,record)=>{
        return  <Switch checked={Boolean(is_index)}/>
      }
    },
    {
      title:'*是否展示在搜索栏',
      key:'is_search',
      dataIndex: 'is_search',
      render:(is_search,record)=>{
        return  <Switch checked={Boolean(is_search)}/>
      }
    },
    {
      title: '操作',
      // key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
      },
    },
  ]
  
  const data=[]
  const dataMore=[]
  const dataList=(dataMore,listData)=>{
    for(let i=0;i<listData.length;i++){
      if(listData[i].parentdata!=undefined){
        if(listData[i].childarray!=undefined){
          dataMore.push({
            key:listData[i].parentdata.property_id,
            property_id:listData[i].parentdata.property_id,
            property_name:listData[i].parentdata.property_name,
            property_status:listData[i].parentdata.property_status,
            is_index:listData[i].parentdata.is_index,
            is_search:listData[i].parentdata.is_search,
            property_pid:listData[i].parentdata.property_pid,
            children:[]
        })
          dataList(dataMore[i].children,listData[i].childarray)
        }else{
          dataMore.push({
            key:listData[i].parentdata.property_id,
            property_id:listData[i].parentdata.property_id,
            property_name:listData[i].parentdata.property_name,
            property_status:listData[i].parentdata.property_status,
            is_index:listData[i].parentdata.is_index,
            is_search:listData[i].parentdata.is_search,
            property_pid:listData[i].parentdata.property_pid,
        })
        }
      }else{
        if(listData[i].childarray!=undefined){
          dataMore.push({
            key:listData[i].property_id,
            property_id:listData[i].property_id,
            property_name:listData[i].property_name,
            property_status:listData[i].property_status,
            is_index:listData[i].is_index,
            is_search:listData[i].is_search,
            property_pid:listData[i].property_pid,
            children:[]
        })
          dataList(dataMore[i].children,listData[i].childarray)
        }else{
          dataMore.push({
            key:listData[i].property_id,
            property_id:listData[i].property_id,
            property_name:listData[i].property_name,
            property_status:listData[i].property_status,
            is_index:listData[i].is_index,
            is_search:listData[i].is_search,
            property_pid:listData[i].property_pid,
        })
        }
      }

    }
  }
  if(list.length!=0){
    dataList(dataMore,list)
  }


  const niubi=(niu)=>{
    for(let i=0;i<niu.length;i++){
      if(niu[i].children!=undefined){
        if(niu[i].property_id==childList[0].parentdata.property_pid){
          // if(niu[i].property_id==dangqian){
          niu[i].children.splice(0,1)
          return niu[i]
        }else{
          niubi(niu[i].children)
        }
      }
    }
  }

  //拿到子数据后的处理
  const shishi=(e)=>{
    const childM=niubi(data)
    for(let j=0;j<e.length;j++){
      childM.children.push(e[j])
    }
  }



  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }
  const getChildPro=(expanded,record)=>{
    // childList=undefined
    getChild(record)
  }

  // if(childList!=undefined){
  //   const childData=[]
  //   for(let i=0;i<childList.length;i++){
  //     if(childList[i].childarray.length!=0){
  //       childData.push({
  //         key:childList[i].parentdata.property_id,
  //         property_id:childList[i].parentdata.property_id,
  //         property_name:childList[i].parentdata.property_name,
  //         property_status:childList[i].parentdata.property_status,
  //         is_index:childList[i].parentdata.is_index,
  //         is_search:childList[i].parentdata.is_search,
  //         // children:[{ key:childList[i].parentdata.property_id+""+i,}]
  //       })
  //     }else{
  //       childData.push({
  //         key:childList[i].parentdata.property_id,
  //         property_id:childList[i].parentdata.property_id,
  //         property_name:childList[i].parentdata.property_name,
  //         property_status:childList[i].parentdata.property_status,
  //         is_index:childList[i].parentdata.is_index,
  //         is_search:childList[i].parentdata.is_search,
  //       })
  //     }

  //   }
  //   shishi(childData)
  // }
  //模拟数据

  //试试
  const onLoadData = (expanded,record) => {
    return new Promise((resolve) => {
      if (record.children) {
        resolve();
        return;
      }
      Utils.request({
        url: ap1All2+'/shop/getproperty',
        method: 'get',
        data:{
          pid:Number(record.property_id),
          typedo:Number(1)
        }
      })
      // setTimeout(() => {
      //   treeNode.props.dataRef.children = [
      //     { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
      //     { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
      //   ];
      //   this.setState({
      //     treeData: [...this.state.treeData],
      //   });
      //   resolve();
      // }, 1000);
    });
  }

  return (
    <Table
      {...tableProps}
      pagination={false}
      rowSelection={undefined}
      // className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      dataSource={dataMore}
      // onExpand={getChildPro}
      // onExpand={onLoadData}
      // rowKey={record => record.property_id}
      // components={{
      //   body: { wrapper: isMotion ? AnimateBody : CommonBody },
      // }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  getChild:PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  // list:PropTypes.list,
}

export default List

