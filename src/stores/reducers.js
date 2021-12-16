import { combineReducers } from 'redux'
import count from './count/reducer.js'
import { produce } from 'immer'

//空了加报错机制
const getKey = (str, flag) => {
  const index = str.indexOf(flag)
  return str.substring(index + 1, str.length + 1)
}

const handleActions = (state, action, reducers, namespace = '') => {
  return Object.keys(reducers).map(key => namespace + '/' + key).includes(action.type)
    ? produce(state, draft => reducers[getKey(action.type, '/')](draft, action))
    : state
}

const getReducers = ({ initState, reducers, namespace }) => (state = initState, action) => handleActions(
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
