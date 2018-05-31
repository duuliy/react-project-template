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


const MemberNameAudit = ({
  location, dispatch, memberNameAudit, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,agreeVisible,id,authentication_status,unagreeVisible
  } = memberNameAudit
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
    agreeVisible:agreeVisible,  //通过model
    unagreeVisible:unagreeVisible,  //未通过model
    id:id,//通过model
    authentication_status:authentication_status,//通过model
    width:800,
    cancelText:'取消',
    okText:'确定',
    maskClosable: false,
    confirmLoading: loading.effects[`memberNameAudit/${modalType}`],
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
        type: `memberNameAudit/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'memberNameAudit/hideModal',
      })
    },
    agreeModal(){
      dispatch({
        type: 'memberNameAudit/showAgreeModal',
      })
    },
    agreeOk(e){
      console.log(id)
      dispatch({
        type: 'memberNameAudit/agreeOk',
        payload:{
          id:id,
          authentication_status:1
        }
      })
    },
    agreeCancel(){
      dispatch({
        type: 'memberNameAudit/hideAgreeModal',
      })
    },
    unagreeModal(){
      dispatch({
        type: 'memberNameAudit/unshowAgreeModal',
      })
    },
    unagreeOk(e){
      // console.log(document.getElementById('unAgree').value)
      dispatch({
        type: 'memberNameAudit/agreeOk',
        payload:{
          id:id,
          authentication_status:2,
          authentication_content:document.getElementById('unAgree').value
        }
      })
    },
    unagreeCancel(){
      dispatch({
        type: 'memberNameAudit/unhideAgreeModal',
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['memberNameAudit/query'],
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
        type: 'memberNameAudit/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (item) {
      // console.log(item.authentication_status)
      // console.log(item.id)
      dispatch({
        type: 'memberNameAudit/getUserInfoes',
        payload: {
          user_id:item.user_id,
          authentication_status:item.authentication_status,
          id:item.id
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'memberNameAudit/updateState',
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
        type: 'memberNameAudit/query',
        payload: {
          user_name:e.name,
          user_phone_num:e.phone,
          // authentication_status:e.name,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'memberNameAudit/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'memberNameAudit/multiDelete',
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
      {modalVisible && <Modal {...modalProps} currentItem={currentItem} id={id} authentication_status={authentication_status}/>}
    </Page>
  )
}

MemberNameAudit.propTypes = {
  memberNameAudit: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ memberNameAudit, loading }) => ({ memberNameAudit, loading }))(MemberNameAudit)
