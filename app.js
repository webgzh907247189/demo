import arrMap from './src/common.js';
import _ from 'lodash';
import attachFastClick from 'fastclick'
attachFastClick.attach(document.body)

console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))


let arr = ['aaa','bbb','ccc']
arrMap(arr)


function * objToArr(obj){
	for (let key of Object.keys(obj)){
		yield [key,obj[key]]
	}
}



let obj = {a: '1',b: '2'}
for(let [key, value] of objToArr(obj)){
	console.log(key, value)
}


if(module.hot)
    module.hot.accept();