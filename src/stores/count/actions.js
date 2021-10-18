import api from '@services/api'
import { COUNT_ADD, COUNT_REDUCE, COUNT_GET_DATA} from './actionTypes'

//这里抽一层数据层 async await 处理接口
export const add = (count) => {
  return (dispatch) => {
    dispatch({
      type: COUNT_ADD,
      count
    })
  }
}

export const reduce = (count) => {
  return (dispatch) => {
    dispatch({
      type: COUNT_REDUCE,
      count
    })
  }
}

// export const getData = (count) => {
//   return (dispatch) => {
//       (async() => {
//       const res = await api.getCake()
//       dispatch({
//         type: 'getData',
//         data: res
//       })
//     })()
//   }
// }

export const getData = () => {
  return async (dispatch) => {
    const res = await api.getCake()
    dispatch({
      type: COUNT_GET_DATA,
      data: res
      // payload: {
      //   list
      // }
    })
  }
}
