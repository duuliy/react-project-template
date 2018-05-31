import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,notification  } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const User = ({
  location, dispatch, webCd, loading
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion,previewVisible,previewImage,fileListOne,shishi
  } = webCd
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,//对话框是否可见
    width:800,
    cancelText:'取消',
    okText:'确定',
    previewVisible,
    fileListOne,
    shishi,
    previewImage,
    maskClosable: false,//点击蒙层是否关闭
    confirmLoading: loading.effects[`webCd/${modalType}`],
    title: `${modalType === 'create' ? '添加链接' : '修改链接'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if(data.adwz=="顶部"){
        data.adwz=1
      }else if(data.adwz=="轮播图"){
        data.adwz=2
      }
      else if(data.adwz=="左1广告"){
        data.adwz=3
      }else if(data.adwz=="左2广告"){
        data.adwz=4
      }else if(data.adwz=="页中广告"){
        data.adwz=5
      }else if(data.adwz=="页内广告"){
        data.adwz=6
      } 
      if(data.adport=='pc'){
        data.adport=0
      }else{
        data.adport=1
      }
      data.adpage=Number(data.adpage)
      data.adstatus=Number(data.adstatus)
      if(modalType=='update'){
        dispatch({
          type: `webCd/${modalType}`,
          payload: data,
        })
          .then(() => {
            handleRefresh()
          })
      }else{
        dispatch({
          type: `webCd/${modalType}`,
          payload:data
        })
          .then(() => {
            handleRefresh()
          })
      }


      // data.is_index = 0;
      // data.shoptype_img = '',
      // data.shoptype_sxf = Number(data.shoptype_sxf),
      // data.shoptype_sort = Number(data.shoptype_sort),
      // data.shoptype_status = Number(data.shoptype_status),
      // data.shoptype_id = currentItem.shoptype_id;
      // data.propertyids =  Object.prototype.toString.call(data.propertyids) == '[object Array]' ?  data.propertyids.join(',') : data.propertyids;

    },
    onCancel () {
      dispatch({
        type: 'webCd/hideModal',
      })
    },
    openSmallModal(file){
      dispatch({
        type: 'webCd/showSmallModal',
        payload: {
          previewImage:file.url || file.thumbUrl,
        },
      })
    },
    closeSmallModal(){
      dispatch({
        type: 'webCd/hideSmallModal',
      })
    },
    fileListChange(item){
      let data=[]
      if(item.length!=0){
        data.push(
          {
                  uid:item.uid,
                  name:item.name,
                  status:item.status,
                  url:item.thumbUrl
                }
        )
      }
      dispatch({
        type: 'webCd/changeFileList',
        payload:{
          fileListOne:data
        }
      })
    },
    fileLoading(data,uid){
      dispatch({
        type: 'webCd/fileLoading',
        payload:{
          shishi:{
            file:data,
            custom:uid
          }
        }
      })
    },
    handleChange(data){
      dispatch({
        type: 'webCd/handleChange',
        payload:{
          fileListOne:[{
            uid:data.data.custom,
            name:data.data.name,
            url:data.data.url,
            status:"done"
          }],
          shishi:{}
        }
      })
    },
    fileRemove(){
      dispatch({
        type: 'webCd/fileRemove',
        payload:{
          fileListOne:[],
        }
      })
    }

  }

  const listProps = {
    list,
    loading: loading.effects['webCd/query'],//暂时理解为触发modal的事件名称,拿数据用的
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'webCd/remove',
        payload: {ids:String(id)},
      })
        .then(() => {
          handleRefresh(
          //   {
          //   page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          // }
        )
        })
    },
    onEditItem (item) {
      let data=[]
      if(item.url!=undefined){
        data.push({
          uid:item.id,
          name:item.adname,
          status:'done',
          url:item.adimg
        })
      }
      dispatch({
        type: 'webCd/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
          fileListOne:data
        },
      })
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'webCd/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onAdd () {

        dispatch({
          type: 'webCd/showModal',
          payload: {
            modalType: 'create',
            fileListOne:[]
          },
        })


    },
    switchIsMotion () {
      dispatch({ type: 'webCd/switchIsMotion' })
    },
  }



  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page> 
  )
}

User.propTypes = {
  webCd: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ webCd, loading }) => ({ webCd, loading }))(User)
