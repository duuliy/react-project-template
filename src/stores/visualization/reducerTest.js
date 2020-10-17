import { useReducer } from 'react'
export const initialState = { count: 0 }

export const reducer = (state, action) => {
  //很像react-redux,但是没有中间件了
  switch (action.type) {
    case 'reset':
      return { count: 0 }
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'testChange':
      state.count = { name: 'duuliy' }
      return { count: state.count }
  }
}

export default () => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
    // {type: 'reset', payload: initialCount}, //第三个参数目前还是提案
  )

  return {
    state,
    dispatch,
  }
}
