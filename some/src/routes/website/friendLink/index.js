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
  location, dispatch, friendLink, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,
  } = friendLink
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
    maskClosable: false,//点击蒙层是否关闭
    confirmLoading: loading.effects[`friendLink/${modalType}`],
    title: `${modalType === 'create' ? '添加链接' : '修改链接'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      data.friendstatus=Number(data.friendstatus)
      if(modalType=='update'){
        dispatch({
          type: `friendLink/${modalType}`,
          payload: data,
        })
          .then(() => {
            handleRefresh()
          })
      }else{
        dispatch({
          type: `friendLink/${modalType}`,
          payload: {
            friendname:data.friendname,
            friendurl:data.friendurl,
            friendstatus:data.friendstatus
          },
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
        type: 'friendLink/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['friendLink/query'],//暂时理解为触发modal的事件名称,拿数据用的
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
        type: 'friendLink/remove',
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
      dispatch({
        type: 'friendLink/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'friendLink/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
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

      // if(list.length<6){
        dispatch({
          type: 'friendLink/showModal',
          payload: {
            modalType: 'create',
          },
        })
      // }else{
      //   notification.open({
      //     message: '数据限制',
      //     description: '您最多可以添加6条商品标签，不能超过6条商品标签！',
      //   });
      // }

    },
    switchIsMotion () {
      dispatch({ type: 'friendLink/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'friendLink/remove',
      payload: {
        ids: String(selectedRowKeys),
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
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`选中 ${selectedRowKeys.length} 条 `}
            <Popconfirm title="你确定要删除这些数据?" placement="left" onConfirm={handleDeleteItems} okText="删除" cancelText="取消">
              <Button type="primary" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page> 
  )
}

User.propTypes = {
  friendLink: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ friendLink, loading }) => ({ friendLink, loading }))(User)
