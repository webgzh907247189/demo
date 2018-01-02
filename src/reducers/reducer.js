import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend'

function testReducer(state = {}, action) {
	let  newState = cloneDeep(state);

	switch (action.type){
		case 'click':
			return extend(newState,{name : 'reduxTest click'})
		case 'showName':
			newState.date1 = action.data
			return extend(newState,{nameTest : 'reduxTest  展示name'})
		case 'asyncTest':
			newState.date = action.payload 
			return extend(newState,{asyncTest1 : 'action 异步展示'})
		default:
			return state
	}
}

export { testReducer }


// let obja = {name: '123'}
// let newObj = Object.assign(obja,{age: '22'})

// console.log(newObj,obja)
//{name: "123", age: "22"} , {name: "123", age: "22"}
// 注意这样使用会使得obja也发生改变


// let newObj = Object.assign({},obja,{age: '22'})  //不会改变obja
// let newObj = {...obja,{age: '22'}  //不会改变obja




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
