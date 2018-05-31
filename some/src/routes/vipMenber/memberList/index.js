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
import PriceModal from './priceModal'


const MemberNameAudit = ({
  location, dispatch, memberList, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,priceModalVisib,
    user_name,user_money,user_integral,user_integral_lv,jifen,zijin,agreeVisible,user_id
  } = memberList
  // console.log(list)
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
    confirmLoading: loading.effects[`memberList/${modalType}`],
    title: `${modalType === 'create' ? '添加分类' : '修改分类'}`,
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
        type: `memberList/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'memberList/hideModal',
      })
    },


  }
  const pricemodalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: priceModalVisib,
    agreeVisible:agreeVisible,
    user_name:user_name,
    user_money:user_money,
    user_integral:user_integral,
    user_integral_lv:user_integral_lv,
    user_id:user_id,
    jifen:jifen,
    zijin:zijin,
    width:1000,
    cancelText:'取消',
    okText:'确定',
    maskClosable: false,
    confirmLoading: loading.effects[`memberList/${modalType}`],
    title: `${modalType === 'create' ? '会员账户变动明细' : '会员账户变动明细'}`,
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
      // dispatch({
      //   // type: `memberList/${modalType}`,
      //   type: `memberList/hidePriceModal`,
      //   payload: data,
      // })
      //   .then(() => {
      //     handleRefresh()
      //   })
      dispatch({
        type: 'memberList/hidePriceModal',
      })
    },
    onCancel () {
  
      dispatch({
        type: 'memberList/hidePriceModal',
      })
    },
    addUserPrice(e){
      dispatch({
        type: 'memberList/showAgreeModal',
      })
    },
    agreeVisibleOk(e,val,id){
      console.log(e)
      console.log(val)
      console.log(id)
      dispatch({
        type: 'memberList/adjustAccountes',
        payload:{
          user_id:id,
          user_integral_lv_type:e.dengji == '增加' ? 'add' : 'reduce',
          user_integral_lv:val.dengji,
          user_integral_type:e.xiaofei == '增加' ? 'add' : 'reduce',
          user_integral:val.xiaofei,
          user_money_type:e.zijin == '增加' ? 'add' : 'reduce',
          user_money:val.zijin,
          text:val.resion,
        }
      })
    },
    unagreeVisible(e){
      dispatch({
        type: 'memberList/hideAgreeModal',
      })
    },

  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['memberList/query'],
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
        type: 'memberList/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (item) {
      // console.log(item)
      dispatch({
        type: 'memberList/getUserInfoes',
        payload: {
          user_id:item.user_id
        },
      })
    },
    onEditItemWatch (item) {
      // console.log(item)
      dispatch({
        type: 'memberList/mingxi',
        payload: {
          user_id:item.user_id,
          user_name:item.user_name,
          user_money:item.user_money,
          user_integral:item.user_integral,
          user_integral_lv:item.user_integral_lv,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'memberList/updateState',
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
      console.log(e)
      dispatch({
        type: 'memberList/query',
        payload: {
          user_name:e.name,
          user_phone_num:e.phone,
          // authentication_status:e.name,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'memberList/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'memberList/multiDelete',
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
      {modalVisible && <Modal {...modalProps} currentItem={currentItem} />}
      {priceModalVisib && <PriceModal {...pricemodalProps} currentItem={currentItem} />}
    </Page>
  )
}

MemberNameAudit.propTypes = {
  memberList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ memberList, loading }) => ({ memberList, loading }))(MemberNameAudit)
