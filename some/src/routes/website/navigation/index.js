import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { routerRedux } from 'dva/router'
import { Page } from 'components'
import queryString from 'query-string'
import Filter from './Filter'
import Modal from './modal';
import List from './list'
import {Tabs} from 'antd'
const {TabPane} =Tabs


const User=({
    location,dispatch,navigation,loading
})=>{
    location.qurey =queryString.parse(location.search)
    const {query,pathname}=location
    const {
        list,modalType,isMotion,modalVisible,pagination,type,alertVisible,currentItem
    }=navigation



    const handleRefresh = () => {
        dispatch({
            type:"navigation/getListData",
            payload:{
                type:Number(type)
            }
        })
      }

    const modalProps={
        type,
        item:modalType==='create' ? {} : currentItem,
        visible:modalVisible,
        width:800,
        cancelText:"取消",
        okText:"确定",
        maskClosable:false,
        confirmLoading:loading.effects[`navigation/${modalType}`],
        title:`${modalType==='create' ? '添加导航' : '修改导航'}`,
        wrapClassName:'vertical-center-modal',
        onOk(data){
  
            if(modalType=='create'){
                dispatch({
                    type:`navigation/${modalType}`,
                    payload:data
                }).then(()=>{
                    handleRefresh()
                })
            }else{
                dispatch({
                    type:`navigation/${modalType}`,
                    payload:data
                }).then(()=>{
                    handleRefresh()
                })
            }
        },
        onCancel(){
            dispatch({
                type:'navigation/hideModal',
            })
        }
    }


    const listProps={
        list,
        loading:loading.effects['navigation/query'],
        pagination,
        location,
        isMotion,
        onEditItem(item){
            dispatch({
                type:"navigation/showModal",
                payload:{
                    modalType:"create",
                }
            })
        },
        onOk(data){
            const data1=[]
            for(let i=0;i<list.length;i++){
                if(list[i].id==data){
                    data1.push(list[i])
                }
            }
    
            dispatch({
                type: 'navigation/showModal',
                payload: {
                  modalType: 'update',
                  currentItem: data1[0],
                },
            })
        },
        onChangeList(targetKey){
     
            dispatch({
                type:"navigation/remove",
                payload:{
                    ids:targetKey,
                }
            }).then(()=>{
                handleRefresh()
            })
        }

    }

    const getChildListData=()=>{
        dispatch({
            type:'navigation/getListData',
        })
    }
    const onchange=(activeKey)=>{

        dispatch({
            type:"navigation/getListData",
            payload:{
                type:Number(activeKey)
            }
        })

    }

    const data=[]
    const data1=[
        {nav_name:"主导航"},
        {nav_name:"左侧导航"},
        {nav_name:"右侧导航"},
        {nav_name:"底部导航"},
    ]
    for(let i=0;i<data1.length;i++){
        data.push(<TabPane tab={data1[i].nav_name} key={i+1}><List {...listProps}/></TabPane>)
    }



    return(
        <Page inner>
            {/* <Filter {...fliterProps}/> */}
            <Tabs onChange={onchange} type="card">
                {data}
            </Tabs>
            {/* <List {...listProps}/> */}
            {modalVisible && <Modal {...modalProps}/>}
        </Page>
    )
}


// User.propTypes={
//     navigation: PropTypes.object,
//     location: PropTypes.object,
//     dispatch: PropTypes.func,
//     loading: PropTypes.object,
// }
User.propTypes = {
    navigation: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
  }
// export default connect(({navigation,loading})=>({navigation,loading}))(User)
export default connect(({ navigation, loading }) => ({ navigation, loading }))(User)