import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const User = ({
  location, dispatch, property, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination,allList, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,childList,ldsjList
  } = property
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
    list,
    ldsjList,
    visible: modalVisible,//对话框是否可见
    width:800,
    cancelText:'取消',
    okText:'确定',
    maskClosable: false,//点击蒙层是否关闭
    confirmLoading: loading.effects[`property/${modalType}`],
    title: `${modalType === 'create' ? '添加标签' : '修改标签'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      data.property_status=Number(data.property_status)
      data.is_dhmust=Number(data.is_dhmust)
      data.is_fbmust=Number(data.is_fbmust)
      data.is_hengfu=Number(data.is_hengfu)
      data.is_index=Number(data.is_index)
      data.is_list=Number(data.is_list)
      data.is_search=Number(data.is_search)
      data.is_title=Number(data.is_title)
      data.is_xjld=Number(data.is_xjld)
      data.ldsj_id=Number(data.ldsj_id)
      data.property_pid=Number(data.property_pid)
      data.property_sort=Number(data.property_sort)
      data.property_zswz=Number(data.property_zswz)
      if(modalType=='update'){
        dispatch({
          type: `property/${modalType}`,
          payload: data,
        })
          .then(() => {
            handleRefresh()
          })
      }else{
        dispatch({
          type: `property/${modalType}`,
          payload: data
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
        type: 'property/hideModal',
      })
    },
  }

  const listProps = {
    list,
    childList,
    allList,
    // dataSource: list,
    loading: loading.effects['property/query'],//暂时理解为触发modal的事件名称,拿数据用的
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
        type: 'property/remove',
        payload: {propertyids:String(id)},
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
      let modalData
      const shishi=(listData)=>{
        for(let i=0;i<listData.length;i++){
          if(listData[i].parentdata!=undefined){
            if(listData[i].parentdata.property_id==item.property_id){
              modalData=listData[i].parentdata
            }else{
              if(listData[i].childarray!=undefined){
                shishi(listData[i].childarray)
              }
            }
          }else{
            if(listData[i].property_id==item.property_id){
              modalData=listData[i]
            }else{
              if(listData[i].childarray!=undefined){
                shishi(listData[i].childarray)
              }
            }
          }
        }
      }
      shishi(list)
      dispatch({
        type: 'property/showModal',
        payload: {
          modalType: 'update',
          currentItem: modalData,
        },
      })
    },
    //请求子数据
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'property/updateState',
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
        type: 'property/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'property/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'property/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
      .then(() => {
        handleRefresh(
        //   {
        //   page: (list.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        // }
      )
      })
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      {/* {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`选中 ${selectedRowKeys.length} 条 `}
            <Popconfirm title="你确定要删除这些数据?" placement="left" onConfirm={handleDeleteItems} okText="删除" cancelText="取消">
              <Button type="primary" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm>
          </Col>
        </Row>
      } */}
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

User.propTypes = {
  property: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ property, loading }) => ({ property, loading }))(User)
