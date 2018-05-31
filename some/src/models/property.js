/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update,getChild,getLdsj } from 'services/property'
import * as propertyService from 'services/property'
import { pageModel } from './common'
// import { getChild } from '../services/property';

const { query } = propertyService
// const { getChild } = propertyService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'property',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    allList:[],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/property') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload:{
              pid:Number(0),
              typedo:Number(1)
            },
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {

      const data = yield call(query,payload)
      const data1=yield call(getLdsj)
      if (data.status == 1) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
            ldsjList:data1.obj
            // pagination: {
            // //   current: Number(payload.page) || 1,
            // //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.total,
            // },
          },
        })
      }
    },

    * remove ({ payload }, { call, put, select }) {
      const data = yield call(remove, payload)
      if (data.status == 1) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(remove, payload)
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
     * getChild({payload},{select,call,put}){
      const data = yield call(getChild,payload)
      if (data.status == 1) {
        yield put(
          {
            type: 'updateArrChild',
            payload:{
              childList:data.obj
            }
          }
        )
      }else{
        throw data
      }
     },
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
    updateArrChild(state,{payload}){
      return { ...payload }
    }

  },
})
