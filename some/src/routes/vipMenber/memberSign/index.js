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
  location, dispatch, memberSign, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,id,authentication_status
  } = memberSign
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

    id:id,//通过model
    authentication_status:authentication_status,//通过model
    width:800,
    cancelText:'取消',
    okText:'确定',
    maskClosable: false,
    confirmLoading: loading.effects[`memberSign/${modalType}`],
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
        type: `memberSign/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'memberSign/hideModal',
      })
    },
    agreeModal(){
      dispatch({
        type: 'memberSign/showAgreeModal',
      })
    },
    agreeOk(e){
      console.log(id)
      dispatch({
        type: 'memberSign/agreeOk',
        payload:{
          id:id,
          authentication_status:1
        }
      })
    },
    agreeCancel(){
      dispatch({
        type: 'memberSign/hideAgreeModal',
      })
    },
    unagreeModal(){
      dispatch({
        type: 'memberSign/unshowAgreeModal',
      })
    },
    unagreeOk(e){
      // console.log(document.getElementById('unAgree').value)
      dispatch({
        type: 'memberSign/agreeOk',
        payload:{
          id:id,
          authentication_status:2,
          authentication_content:document.getElementById('unAgree').value
        }
      })
    },
    unagreeCancel(){
      dispatch({
        type: 'memberSign/unhideAgreeModal',
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['memberSign/query'],
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
        type: 'memberSign/delete',
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
        type: 'memberSign/getUserInfoes',
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
          type: 'memberSign/updateState',
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
        type: 'memberSign/query',
        payload: {
          user_name:e.name,
          // user_phone_num:e.phone,
          // authentication_status:e.name,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'memberSign/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'memberSign/multiDelete',
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
      <Tabs defaultActiveKey="1" >
        <TabPane tab="签到管理" key="1">
          <div style={{margin:'10px 0'}}>
            <span>是否保存签到日志&emsp;</span>
            <RadioGroup onChange={()=>{}} >
              <Radio value={1}>否</Radio>
              <Radio value={2}>是</Radio>
            </RadioGroup>
          </div>
          <div>
            <span>签到日志保存天数&emsp;</span>
            <input />
            <span>&emsp;为每个用户保存签到日志多少天，0表示不限制</span>
          </div>
          <Button style={{marginTop:'20px'}}>确定</Button>
        </TabPane>
        <TabPane tab="签到日志" key="2">
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
          {modalVisible && <Modal {...modalProps} currentItem={currentItem} id={id} authentication_status={authentication_status}/>}</TabPane>
      </Tabs>
     
    </Page>
  )
}

MemberNameAudit.propTypes = {
  memberSign: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ memberSign, loading }) => ({ memberSign, loading }))(MemberNameAudit)
