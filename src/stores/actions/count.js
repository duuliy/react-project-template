//这里抽一层数据层 async await 处理接口
export const add = (count) => {
  return (dispatch) => {
    (() => {
      dispatch({
        type: 'addCount',
        count
      })
    })()
  }
}

export const reduce = (count) => {
  return (dispatch) => {
    (() => {
      dispatch({
        type: 'reduceCount',
        count
      })
    })()
  }
}
