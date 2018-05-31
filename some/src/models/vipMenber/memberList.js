/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update,query ,getUserInfoes,edtUserAuthenticationes,getUserIntegralLoges,getCapitalLoges,adjustAccountes} from 'services/vipMenber/memberList'
import * as usersService from 'services/users'
import { pageModel } from '../common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'memberList',

  state: {
    user_name:'',
    user_money:'',
    user_integral:'',
    user_integral_lv:'',
    user_id:'',
    //积分  资金
    jifen:{},
    zijin:{},
    currentItem: {},
    modalVisible: false,
    priceModalVisib:false,
    agreeVisible:false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/memberList') {
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
            // pagination: {
            // //   current: Number(payload.page) || 1,
            // //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.total,
            // },
          },
        })
      }
    },

    * getUserInfoes ({ payload }, { call, put, select }) {

      const data = yield call(getUserInfoes, {user_id:payload.user_id})
      // console.log(data)
      if (data.status == 1) {
        // yield put({ type: 'showModal',payload:{lists:data.list,id:payload.id,authentication_status:payload.authentication_status} })
        yield put({ type: 'showModal',payload:{lists:data.list} })
      } else {
        throw data
      }
    },
    //调整会员账户
    * adjustAccountes ({ payload }, { call, put, select }) {
      const data = yield call(adjustAccountes, payload)
      if (data.status == 1) {
        yield put({ type: 'hideAgreeModal' })
      } else {
        throw data
      }
    },

//账目明细
* mingxi ({ payload }, { call, put, select }) {
    const data = yield call(getUserIntegralLoges, {user_id:payload.user_id})
    const data1 = yield call(getCapitalLoges,  {user_id:payload.user_id})
    // console.log(data)
    // console.log(data1)

    if ( data1.status == 1) {
      yield put({ type: 'showPriceModal',payload:{...payload,data,data1} })
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
    showPriceModal (state, { payload }) {
      console.log(payload)
      return { ...state, ...payload, priceModalVisib: true,jifen:payload.data,zijin:payload.data1,user_id:payload.user_id}
    },

    hidePriceModal (state) {
      return { ...state, priceModalVisib: false }
    },


    showAgreeModal (state) {
      return { ...state, agreeVisible: true }
    },
    hideAgreeModal (state) {
      return { ...state, agreeVisible: false }
    },

    // unshowAgreeModal (state) {
    //   return { ...state, unagreeVisible: true }
    // },
    // unhideAgreeModal (state) {
    //   return { ...state, unagreeVisible: false }
    // },
    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
