import { produce } from 'immer'

const init = {
  number: 0,
  number2: 222,
  data:{}
}

export default (state = init, action) => produce(state, draft =>{
  switch (action.type) {
    case 'addCount': //还是不能重复 考虑count/addCount形式
      draft.number= draft.number+1
      return void(0)
      // return { ...state, number: action.count + 1 }
    case 'reduceCount':
      draft.number--
      // return { ...state, number: action.count - 1 }
      return void (0)
    case 'reduceCount2':
      draft.number2= draft.number2+2
      // return { ...state, number2: action.count2 + 2 }
      return void (0)
    case 'getData':
      draft.data = action.data
      // return { ...state, number2: action.count2 + 2 }
      return void (0)
    default:
      return void (0)
  }
})