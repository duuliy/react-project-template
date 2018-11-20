
import queryString from 'query-string'   //数据转json string
import { logoutUser } from '../services/api'
import { getUser } from '../utils/user'

export default {

  namespace: 'common',

  state: {
    data:{},
    user: {
      name:"admin",
      secrit:"123456"
    },
    language:"zh_CN"
  },



  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {

    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    async signIn({ payload }, { call, put, select }){
      // const { success, user } = yield call(queryUserInfo, payload)
      const  user = await select(state => state.user===payload&&true)
      if(user&&getUser){
        router.push('/example')
      }else{
        router.push('/login')
      }
    },
    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            user: {
              name:"",
              secrit:""
            },
            // menu: [
            //   {
            //     id: '1',
            //     icon: 'laptop',
            //     name: 'Dashboard',
            //     zhName: '仪表盘',
            //     router: '/dashboard',
            //   },
            // ],
          }
        })
        yield put({ type: 'signIn' })
      } else {
        throw data
      }
    },
    
  },

  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    chlang(state, action){
      return { ...state, language: action.payload };
    }
  }

};
