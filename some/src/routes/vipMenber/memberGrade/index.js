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
  location, dispatch, memberGrade, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem,lists, modalVisible, modalType, isMotion, selectedRowKeys,agreeVisible,id,authentication_status,unagreeVisible
  } = memberGrade
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
    item: modalType === 'create' ? {} : lists,
    visible: modalVisible,
    agreeVisible:agreeVisible,  //通过model
    unagreeVisible:unagreeVisible,  //未通过model
    id:id,//通过model
    // lists:lists,
    authentication_status:authentication_status,//通过model
    width:600,
    cancelText:'取消',
    okText:'确定',
    maskClosable: false,
    confirmLoading: loading.effects[`memberGrade/${modalType}`],
    title: `${modalType === 'create' ? '修改' : '修改'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log(data )
     
      dispatch({
        type: `memberGrade/updataUserLves`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'memberGrade/hideModal',
      })
    },
    agreeModal(){
      dispatch({
        type: 'memberGrade/showAgreeModal',
      })
    },
    agreeOk(e){
      console.log(id)
      dispatch({
        type: 'memberGrade/agreeOk',
        payload:{
          id:id,
          authentication_status:1
        }
      })
    },
    agreeCancel(){
      dispatch({
        type: 'memberGrade/hideAgreeModal',
      })
    },
    unagreeModal(){
      dispatch({
        type: 'memberGrade/unshowAgreeModal',
      })
    },
    unagreeOk(e){
      // console.log(document.getElementById('unAgree').value)
      dispatch({
        type: 'memberGrade/agreeOk',
        payload:{
          id:id,
          authentication_status:2,
          authentication_content:document.getElementById('unAgree').value
        }
      })
    },
    unagreeCancel(){
      dispatch({
        type: 'memberGrade/unhideAgreeModal',
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['memberGrade/query'],
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
        type: 'memberGrade/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (item,lists) {
      // console.log(item.authentication_status)
      console.log(item)
      console.log(lists)
      dispatch({
        type: 'memberGrade/openUserLves',
        payload: {lists:lists,id:item.id},
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'memberGrade/updateState',
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
        type: 'memberGrade/query',
        payload: {
          user_name:e.name,
          user_phone_num:e.phone,
          // authentication_status:e.name,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'memberGrade/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'memberGrade/multiDelete',
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
      {/* <Filter {...filterProps} /> */}
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

      {modalVisible && <Modal {...modalProps} lists={lists} id={id} />}
    </Page>
  )
}

MemberNameAudit.propTypes = {
  memberGrade: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ memberGrade, loading }) => ({ memberGrade, loading }))(MemberNameAudit)
