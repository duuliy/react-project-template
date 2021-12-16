const initState = {
  number: 0,
  number2: 222,
  data: []
}

const reducers = {
  add(state, action) {
    state.number+=1
  },
  reduce(state, action) {
    state.number -= 1
  },
  reduce2(state, action) {
    state.number2 = action.number2
  },
  getData(state, action) {
    state.data = action.data
  },
}


export default{
  namespace: 'count',
  initState,
  reducers
}

// 保留老写法
// export default (state = initState, action) => produce(state, draft => {
//   switch (action.type) {
//     case COUNT_ADD: //还是不能重复 考虑count/addCount形式
//       console.log(draft.number)
//       draft.number = state.number + 1
//       return void (0)
//     // return { ...state, number: action.count + 1 }
//     case COUNT_REDUCE:
//       draft.number--
//       // return { ...state, number: action.count - 1 }
//       return void (0)
//     case COUNT_REDUCE2:
//       draft.number2 = draft.number2 + 2
//       // return { ...state, number2: action.count2 + 2 }
//       return void (0)
//     case COUNT_GET_DATA:
//       draft.data = action.data
//       // return { ...state, number2: action.count2 + 2 }
//       return void (0)
//     default:
//       return void (0)
//   }
// })