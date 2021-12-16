import api from '@services/api'

//这里抽一层数据层 async await 处理接口
export const getData = () => {
  return async (dispatch) => {
    const res = await api.getCake()
    dispatch({
      type: 'count/getData',
      data: res
      // payload: {
      //   list
      // }
    })
  }
}