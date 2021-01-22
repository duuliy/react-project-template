//这里抽一层数据层
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
