import { combineReducers } from 'redux'
import count from './count/reducer'
import { produce } from 'immer'

//空了加报错机制
const getKey = (str:string, flag:string) => {
  const index = str.indexOf(flag)
  return str.substring(index + 1, str.length + 1)
}

const handleActions = (state: object, action: any, reducers: any, namespace = '') => {
  return Object.keys(reducers).map(key => namespace + '/' + key).includes(action.type)
    ? produce(state, draft => reducers[getKey(action.type, '/')](draft, action))
    : state
}

const getReducers = ({ initState, reducers, namespace }: { initState: object, reducers: object, namespace: string }) => (state = initState, action:any) => handleActions(
  state,
  action,
  reducers,
  namespace,
)

//合并多个reducer
const reducers = combineReducers({
  count: getReducers(count)
})

export default reducers
