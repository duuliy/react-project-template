import { useReducer, useContext } from 'react'
import { UserProvider, UserContext } from '@stores/context'

const TestReducerBrother = () => {
  const { state, dispatch } = useContext(UserContext)
  console.log(777)

  return (
    <div className="hhh">
      组件2
      <div className="yyy">{JSON.stringify(state.count)}</div>
    </div>
  )
}

export default TestReducerBrother
