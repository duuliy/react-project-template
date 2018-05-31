import { routerRedux } from 'dva/router'
import { login, GetCa } from 'services/login'

export default {
  namespace: 'login',

  state: {
    captcha: ''
  },

  effects: {
    * login({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      console.log(data.data.menu)
      const { locationQuery } = yield select(_ => _.app)
      if (data.status == 1) {
        const { from } = locationQuery
        // 加[]
        localStorage.clear()
        localStorage.setItem('menu', JSON.stringify([data.data.menu]))
        localStorage.setItem('role', JSON.stringify([data.data.role]))
        yield put({ type: 'app/query', payload: { data } })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
    *getCaptcha({ }, { put, call, select }) {
      const data = yield call(GetCa)
      // console.log(data);
      if (data.status == 1) {
        // alert()
        yield put({ type: 'captchaes', payload: { data } })
      }
    }
  },



  reducers: {
    captchaes(state, { payload }) {
      console.log(payload)
      console.log(payload.url)
      return { ...state, captcha: payload.data.url }
    }
  }

}
