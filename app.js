import 'babel-polyfill';



function * objToArr(obj){
	for (let key of Object.keys(obj)){
		yield [key,obj[key]]
	}
}



let obj = {a: '1',b: '2'}
for(let [key, value] of objToArr(obj)){
	console.log(key, value)
}