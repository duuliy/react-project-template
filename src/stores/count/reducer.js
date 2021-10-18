import { produce } from 'immer'
import { COUNT_ADD, COUNT_REDUCE, COUNT_REDUCE2, COUNT_GET_DATA } from './actionTypes.js'

const init = {
  number: 0,
  number2: 222,
  data: {}
}

export default (state = init, action) => produce(state, draft => {
  switch (action.type) {
    case COUNT_ADD: //还是不能重复 考虑count/addCount形式
      draft.number = state.number + 1
      return void (0)
    // return { ...state, number: action.count + 1 }
    case COUNT_REDUCE:
      draft.number--
      // return { ...state, number: action.count - 1 }
      return void (0)
    case COUNT_REDUCE2:
      draft.number2 = draft.number2 + 2
      // return { ...state, number2: action.count2 + 2 }
      return void (0)
    case COUNT_GET_DATA:
      draft.data = action.data
      // return { ...state, number2: action.count2 + 2 }
      return void (0)
    default:
      return void (0)
  }
})