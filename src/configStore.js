import { createStore, applyMiddleware, combineReducers } from 'redux'
import {testReducer} from './reducers/reducer'
import thunkMiddleware from 'redux-thunk';

//state 对象的结构由传入的多个 reducer 的 key 决定。

const chatReducer = combineReducers({
  testReducer
})

let initState = {testReducer: {name:'redux测试',age:'111111111111'}}  // 初始化带有state，必须和reducer名字配套
const store = createStore(chatReducer,initState,applyMiddleware(thunkMiddleware))


// let initState = {name:'redux测试',age:'111111111111'}
// const store = createStore(chatReducer)

export default store







/*
 * 所有未匹配到的 action，必须把它接收到的第一个参数也就是那个 state 原封不动返回。
 *
 * 永远不能返回 undefined。当过早 return 时非常容易犯这个错误，为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。
 *
 * 如果传入的 state 就是 undefined，一定要返回对应 reducer 的初始 state。根据上一条规则，初始 state 禁止使用 undefined。
 * 使用 ES6 的默认参数值语法来设置初始 state 很容易，但你也可以手动检查第一个参数是否为 undefined。
 *
 */

 // combineReducers 自动帮你检查 reducer 是否符合以上规则  (https://www.cnblogs.com/wy1935/p/7109701.html)
