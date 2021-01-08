import { useContext } from 'react'
import { UserContext } from '@stores/context'

const ReducerTest = () => {
  const { state, dispatch } = useContext(UserContext)
  // const { username, handleChangeUsername } = useContext( UserContext )

  // const [ state, dispatch ] = useReducer(
  //   reducerTest,
  //   initialState,
  //   // {type: 'reset', payload: initialCount}, //第三个参数目前还是提案
  // );
  console.log(666)
  return (
    <div className="hhh">
      组件1
      {/* {username } */}
      <div className="yyy">{JSON.stringify(state.count)}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
      <button onClick={() => dispatch({ type: 'testChange' })}>break</button>
    </div>
  )
}

export default ReducerTest
