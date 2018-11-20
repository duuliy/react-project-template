// import { query } from '@/query/api';
import queryString from 'query-string'   //数据转json string


export default {

  namespace: 'productsModel',
  state: {
    // data:{},
    count: 0,
  },



//   subscriptions: {
//     setup({ dispatch, history }) {   //history，windows原生方法  //setup订阅数据源里面的方法
//       history.listen(location => {    //监听路由
//         if (location.pathname === '/Home/Users') {
//           const payload = location.query || { page: 1, pageSize: 10 }
//           dispatch({
//             type: 'query',
//             payload,
//           })
//         }
//       })
//     },
//   },

//   subscriptions: {
//     setup({ dispatch, history }) {  // eslint-disable-line
//     },
//   },

  effects: {
  //   *query({ payload }, { call, put }) {   //去拿当前页面数据
  //     const response = yield call(qqqUser2, payload);
  //     if (response) {
  //         yield put({
  //             type: 'query',
  //             payload: response,
  //         });
  //     }
  // },
  //   *fetch({ payload }, { call, put }) {  // eslint-disable-line
  //     yield put({ type: 'save' });
  //   },
  //   *add({ payload }, { call, put }) {
  //     const payload2=queryString.parse(payload)   //代码健壮性
  //     const res = yield call(query, payload2);
  //     if (response) {
  //         yield put({
  //             type: 'save',
  //             payload: res,
  //         });
  //     }
  //   },
  //   async add({ payload }, { select,call, put }) {    //等有接口了测试这种是否可以代替yield
  //     const count = await select(state => state.global.notices.length);  //select自身再次处理数据
  //     await put({
  //       type: 'user/changeNotifyCount',  //这样可以调用其他model里面的方法
  //       payload: count,
  //     });
  //     const res = await call(query, payload);
  //     if (response) {
  //       await put({
  //             type: 'save2',
  //             payload: res,
  //         });
  //     }
  //   },
  },

  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    save2(state, {payload}) {
      return { ...state, data: payload };
    },
    add (state) { 
      return {...state,count:state.count+1 }
    }
  },

};
