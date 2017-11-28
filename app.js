
import arrMap from './src/common'
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