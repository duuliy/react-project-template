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
  location, dispatch, salesReturnList, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,
  } = salesReturnList
  // console.log(currentItem)
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
    visible: modalVisible,
    width:800,
    cancelText:'取消',
    okText:'确定',
    maskClosable: false,
    confirmLoading: loading.effects[`salesReturnList/${modalType}`],
    title: `${modalType === 'create' ? '退货详情' : '退货详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log(data.shoptype_img )
      data.is_index = 0;
      // data.shoptype_img = '',
      data.shoptype_sxf = Number(data.shoptype_sxf),
      data.shoptype_sort = Number(data.shoptype_sort),
      data.shoptype_status = Number(data.shoptype_status),
      data.shoptype_id = currentItem.shoptype_id;
      data.propertyids =  Object.prototype.toString.call(data.propertyids) == '[object Array]' ?  data.propertyids.join(',') : data.propertyids;
      dispatch({
        type: `salesReturnList/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'salesReturnList/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['salesReturnList/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        pageIndex: page.current,
        pageSize: 10,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'salesReturnList/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (item) {
      dispatch({
        type: 'salesReturnList/getRefundOrder',
        payload: {
          // modalType: 'update',
          // currentItem: item,
          refund_no:item.refund_no
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'salesReturnList/updateState',
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
    onAdd (e) {
      // console.log(e)
   
      dispatch({
        type: 'salesReturnList/query',
        payload: {
          order_no: e.dingdan,
          refund_no:e.liushui,
          user_name:e.person
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'salesReturnList/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'salesReturnList/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
      .then(() => {
        handleRefresh({
          page: (list.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} currentItem={currentItem}/>}
    </Page>
  )
}

User.propTypes = {
  salesReturnList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ salesReturnList, loading }) => ({ salesReturnList, loading }))(User)
