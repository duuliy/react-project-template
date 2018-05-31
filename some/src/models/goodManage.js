/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update ,query,getSortManage} from 'services/goodManage'

import * as usersService from 'services/users'
import { pageModel } from './common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'goodManage',

  state: {
    sortManage:{},
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/goodManage') {
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
      const sortManage = yield call(getSortManage, {  })
      // console.log(data)
      console.log(sortManage)
      if (data.status == 1) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: sortManage.obj,

            // pagination: {
            //   current: Number(data.obj) || 1,
            //   pageSize: Number(data.obj.limit) || 10,
            //   total: data.total,
            // },
          },
        })
        yield put({
          type:'sortManage',
          payload:{
            sortManage:sortManage.obj
          }
        })
      }
    },
    //获取商品分类
    * getSortManage({payload},{call, put, select}){
      const data = yield call(getSortManage, { shoptypeids: String(payload) })
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
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
    sortManage(state,{payload}){
      return { ...state, sortManage : payload.sortManage }
    }
  },
})
