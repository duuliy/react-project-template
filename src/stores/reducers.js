import { combineReducers } from 'redux'
import count from './count/reducer.js'

//合并多个reducer
const reducers = combineReducers({
  count,
})

export default reducers
