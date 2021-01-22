import { combineReducers } from 'redux'
import count from './count'

//合并多个reducer
const reducers = combineReducers({
  count,
})

export default reducers
