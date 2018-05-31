/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { message, Button } from 'antd';
import { create, remove, update,query ,getUserInfoes,examineSquates,querySearch} from 'services/manageCheck'
import * as usersService from 'services/users'
import { pageModel } from './common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'manageCheck',

  state: {
    currentItem: {},
    statusActive:'',
    modalVisible: false,
    agreeVisible:false,   //同意 按钮  modal
    unagreeVisible:false,   //同意 按钮  modal

    id:'',  //modal 通过 参数
    authentication_status:'',  //modal 通过 参数
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      console.log(history)
      history.listen((location) => {
        if (location.pathname === '/manageCheck') {
          const payload = queryString.parse(location.search) || { pageIndex: 1, pageSize: 10,type:1 }
          dispatch({
            type: 'query',
            payload:{shop_status:0},
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload  }, { call, put }) {
    console.log(payload)
      const data = yield call(query, payload )
      console.log(data)
      if (data.status == 1) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
            pagination: {
              current: Number(payload.pageIndex) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.count,
            },
          },
        })
      }
    },


    * getUserInfoes ({ payload }, { call, put, select }) {
    //    console.log(payload)
      const data = yield call(getUserInfoes, {squat_id:payload.squat_id})
        // console.log(data)
      if (data.status == 1) {
        yield put({ type: 'showModal',payload:{lists:data.list} })
      } else {
        throw data
      }
    },


//通过 确定
* agreeOk ({ payload }, { call, put, select }) {
  console.log(payload)
    const data = yield call(examineSquates, payload)

    if (data.status == 1) {
      yield put({ type: 'hideAgreeModal' })
      yield put({ type: 'hideModal' })
      message.success('审核通过');
      const data = yield call(query, {} )
      if (data.status == 1) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              current: Number(payload.pageIndex) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.count,
            },
          },
        })
      }
    } else {
      throw data
    }
  },
//通过 确定
* unagreeOk ({ payload }, { call, put, select }) {
    const data = yield call(examineSquates, payload)
    if (data.status == 1) {
      yield put({ type: 'unhideAgreeModal' })
      yield put({ type: 'hideModal' })
      message.success('审核失败');
      const data = yield call(query, {} )
      if (data.status == 1) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              current: Number(payload.pageIndex) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.count,
            },
          },
        })
      }
    } else {
      throw data
    }
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
      return { ...state, ...payload, modalVisible: true,currentItem:payload.lists}
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },


    showAgreeModal (state) {
      return { ...state, agreeVisible: true }
    },
    hideAgreeModal (state) {
      return { ...state, agreeVisible: false }
    },

    unshowAgreeModal (state) {
      return { ...state, unagreeVisible: true }
    },
    unhideAgreeModal (state) {
      return { ...state, unagreeVisible: false }
    },
    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
