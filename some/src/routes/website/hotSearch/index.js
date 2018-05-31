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
    location,dispatch,hotSearch,loading
})=>{
    location.qurey =queryString.parse(location.search)
    const {query,pathname}=location
    const {
        list,modalType,isMotion,modalVisible,pagination,alertVisible,currentItem
    }=hotSearch



    const handleRefresh = () => {
        dispatch({
            type:"hotSearch/query",
        })
      }

    const modalProps={
        item:modalType==='create' ? {} : currentItem,
        visible:modalVisible,
        width:800,
        cancelText:"取消",
        okText:"确定",
        maskClosable:false,
        confirmLoading:loading.effects[`hotSearch/${modalType}`],
        title:`${modalType==='create' ? '添加搜索' : '修改搜索'}`,
        wrapClassName:'vertical-center-modal',
        onOk(data){
    
            if(modalType=='create'){
                dispatch({
                    type:`hotSearch/${modalType}`,
                    payload:data
                }).then(()=>{
                    handleRefresh()
                })
            }else{
                dispatch({
                    type:`hotSearch/${modalType}`,
                    payload:data
                }).then(()=>{
                    handleRefresh()
                })
            }
        },
        onCancel(){
            dispatch({
                type:'hotSearch/hideModal',
            })
        }
    }


    const listProps={
        list,
        loading:loading.effects['hotSearch/query'],
        pagination,
        location,
        isMotion,
        onEditItem(item){
            dispatch({
                type:"hotSearch/showModal",
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
                type: 'hotSearch/showModal',
                payload: {
                  modalType: 'update',
                  currentItem: data1[0],
                },
            })
        },
        onChangeList(targetKey){

            dispatch({
                type:"hotSearch/remove",
                payload:{
                    ids:targetKey,
                }
            }).then(()=>{
                handleRefresh()
            })
        }

    }

    const fliterProps={
        isMotion,
        filter:{
            ...query,
        }

    }







    return(
        <Page inner>
            {/* <Filter {...fliterProps}/> */}
           <List {...listProps}/>
            {/* <List {...listProps}/> */}
            {modalVisible && <Modal {...modalProps}/>}
        </Page>
    )
}


// User.propTypes={
//     hotSearch: PropTypes.object,
//     location: PropTypes.object,
//     dispatch: PropTypes.func,
//     loading: PropTypes.object,
// }
User.propTypes = {
    hotSearch: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
  }
// export default connect(({hotSearch,loading})=>({hotSearch,loading}))(User)
export default connect(({ hotSearch, loading }) => ({ hotSearch, loading }))(User)