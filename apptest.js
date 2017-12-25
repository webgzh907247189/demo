import arrMap from './src/common'
import fetch from 'isomorphic-fetch'
import attachFastClick from 'fastclick'
import {objToArr} from 'util/index'
import _ from 'lodash'

console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))


attachFastClick.attach(document.body)

// import $ from 'jquery'
// let aa = $('#aa').html()
// console.log(aa)

let arr = ['a','b','c']
arrMap(arr)





let obj = {aaa: '1111',bbb: '2222'}
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



let div = document.createElement('div')
div.id = 'create-element-by-test'
// div.innerHTML = '13213213'
div.textContent = 'this is test for createElement'
document.body.appendChild(div)

if(module.hot) module.hot.accept()
