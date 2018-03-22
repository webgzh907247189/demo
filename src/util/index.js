import fetch from "isomorphic-fetch";

function * objToArr(obj){
	for (let key of Object.keys(obj)){
		yield [key,obj[key]]
	}
}


function getDownUrl(url,paraObj={}){
    return Object.keys(paraObj).reduce((result,item)=>{
        return result += paraObj[item] && `${item}=${encodeURIComponent(paraObj[item])}&` || ''
    },`${url}?`).slice(0,-1)
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

function testTreeShak(){
	let a = 1 + 2 + 3 + 4 + 5
	console.log('测试Tree Shaking,在生产环境的bundle.js中应该没有这个函数',a)
	return a
}

export { objToArr, getLocationQuery, testTreeShak }
/*
 * 总结: 只要配置.babelrc{ "modules": false }属性，在没有引用这个函数的情况下，就不会打包进bundle中
 */

// 删除.babelrc配置，在文件import testTreeShak                                bundle 有这个函数
// 删除.babelrc配置，没有在文件import testTreeShak                            bundle 有这个函数
// 删除.babelrc配置，没有在文件import testTreeShak 且加上去除console的配置    bundle 有这个函数

// 恢复.babelrc配置，在文件import testTreeShak                                bundle 没有这个函数
// 恢复.babelrc配置，没有在文件import testTreeShak                            bundle 没有这个函数
// 恢复.babelrc配置，没有在文件import testTreeShak 且加上去除console的配置    bundle 没有这个函数