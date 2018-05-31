import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,Tabs ,Radio } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

const MemberNameAudit = ({
  location, dispatch, downCheck, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,id,authentication_status,status,agreeVisible,unagreeVisible
  } = downCheck
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
    agreeVisible:agreeVisible,
    unagreeVisible:unagreeVisible,
    currentItem:currentItem,
    id:id,//通过model
    authentication_status:authentication_status,//通过model
    width:800,
    cancelText:'取消',
    okText:'确定',
    maskClosable: false,
    confirmLoading: loading.effects[`downCheck/${modalType}`],
    title: `${modalType === 'create' ? '蹲号方案详情' : '蹲号方案详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
     
      dispatch({
        type: 'downCheck/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'downCheck/hideModal',
      })
    },
    agreeModal(){
      // alert()
      dispatch({
        type: 'downCheck/showAgreeModal',
      })
    },
    agreeOk(e){
      console.log(e)
      dispatch({
        type: 'downCheck/agreeOk',
        payload:{
          squat_id:e,
          squat_status:3
        }
      })
    },
    agreeCancel(){
      dispatch({
        type: 'downCheck/hideAgreeModal',
      })
    },
    unagreeModal(){
      dispatch({
        type: 'downCheck/unshowAgreeModal',
      })
    },
    unagreeOk(e){
      // console.log(document.getElementById('unAgree').value)
      dispatch({
        type: 'downCheck/unagreeOk',
        payload:{
          squat_id:e,
          squat_status:2,
          squat_remark:document.getElementById('unAgree').value
        }
      })
    },
    unagreeCancel(){
      dispatch({
        type: 'downCheck/unhideAgreeModal',
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['downCheck/query'],
    pagination,
    status,
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
        type: 'downCheck/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (e) {

      console.log(e)
      dispatch({
        type: 'downCheck/getUserInfoes',
        payload:e
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'downCheck/updateState',
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
    fatherHandleClick(e){
      console.log(e)
    },
    onAdd (e) {
      console.log(e)
      dispatch({
        type: 'downCheck/Search',
        payload:e,
      })
    },
    switchIsMotion () {
      dispatch({ type: 'downCheck/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'downCheck/multiDelete',
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
    {modalVisible && <Modal {...modalProps} />}
  </Page>
  )
}

MemberNameAudit.propTypes = {
  downCheck: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ downCheck, loading }) => ({ downCheck, loading }))(MemberNameAudit)
