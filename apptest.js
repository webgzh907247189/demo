import arrMap from './src/common'
import fetch from 'isomorphic-fetch'
import attachFastClick from 'fastclick'
import _ from 'lodash'

console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))


attachFastClick.attach(document.body)

// import $ from 'jquery'
// let aa = $('#aa').html()
// console.log(aa)

let arr = ['a','b','c']
arrMap(arr)



function * objToArr(obj){
	for (let key of Object.keys(obj)){
		yield [key,obj[key]]
	}
}

let obj = {aaa: '111',bbb: '222'}
for(let [key, value] of objToArr(obj)){
	console.log(key, value)
}



setTimeout(test,1000,'ccc')
function test(arg){
	console.log(arg)
}



fetch('/api/data').then(function(res) {
  return res.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});


if(module.hot) module.hot.accept()
