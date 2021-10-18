import { createStore, applyMiddleware } from 'redux'
//处理redux的异步任务的中间件
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers.js'

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store