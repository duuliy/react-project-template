/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update,query,getOrderInfoes,yijiaOrderes } from 'services/order/orderList'
// import * as usersService from 'services/users'
import { pageModel } from '../common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'orderList',

  state: {
    currentItem: {},
    priceModalvisible:false,
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/orderList') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
        // console.log(data)
      if (data.status == 1) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: {
              current: Number(data.pageIndex) || 1,
              pageSize: Number(data.pageCount) || 10,
              total: data.count,
            },
          },
        })
      }
    },
    *getOrderInfo({payload},{call,put}){
        //  console.log(payload)
        const getRefundOrder = yield call(getOrderInfoes, payload)
        console.log(getRefundOrder)
        if (getRefundOrder.status == 1) {
            yield put({ type: 'showModal',payload:getRefundOrder.list })
          } else {
            throw getRefundOrder
          }
    },

//弹出框 修改价格
    *changePrice({payload},{call,put}){
      const data = yield call(yijiaOrderes, payload)
        console.log(data)
    },


    * delete ({ payload }, { call, put, select }) {
    //  console.log(payload)
      const data = yield call(remove, { shoptypeids: String(payload) })
      if (data.status == 1) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {

      const data = yield call(create, payload)
      if (data.status == 1) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      // const id = yield select(({ user }) => user.currentItem.id)
      // const newUser = { ...payload, id }
      const data = yield call(update, payload)
      if (data.status == 1) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true, currentItem:payload}
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showPriceModal (state) {
      return { ...state, priceModalvisible: true }
    },
    hidePriceModal (state) {
      return { ...state, priceModalvisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
