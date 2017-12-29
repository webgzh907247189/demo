import { createStore, applyMiddleware, combineReducers } from 'redux'
import {testReducer} from './reducers/reducer'


const chatReducer = combineReducers({
  testReducer
})

let initState = {testReducer: {name:'redux测试',age:'111111111111'}}  
const store = createStore(chatReducer,initState)


// let initState = {name:'redux测试',age:'111111111111'}
// const store = createStore(chatReducer)

export default store
