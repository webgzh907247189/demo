function * objToArr(obj){
	for (let key of Object.keys(obj)){
		yield [key,obj[key]]
	}
}


function getLocationQuery(){
	let search = window.location.search.substr(1)
	let hash = window.location.hash.substr(1)
	let obj = {}
	for(let item of [search,hash]){
		obj = {
			...obj,
			...item.split('&').reduce((result,arrItem)=>{
				let [key,value] = arrItem.split('=')
				result[key] = value
				return result
			},Object.create(null))
		}
	}
	return obj
}

export { objToArr, getLocationQuery }