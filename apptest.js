import arrMap from './src/common'
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




// testTreeShak()

let obj = {aaa: '1111',bbb: '2222'}
for(let [key, value] of objToArr(obj)){
	console.log(key, value)
}



setTimeout(test,1000,'ccc')
function test(arg){
	console.log(arg)
}








{
	let draw = function (count){
		// 抽奖业务逻辑
		console.log(`剩余的次数${count}`)
	}

	let drawCount = function *(count){
		while(count>0){
			count--
			yield draw(count)
		}
	}

	let drawDes = drawCount(5)
	let div = document.createElement('div')
	div.id = 'create-element-by-test'
	// div.innerHTML = '13213213'
	div.textContent = 'this is test for createElement'
	document.body.appendChild(div)

	document.getElementById('create-element-by-test').addEventListener('click',()=>{
		let a = drawDes.next()
		console.log(a)
	},false)
}



{
	let ajax = function *(){
		yield new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve({code: '0'})
			},200)
		})
	}

	let pull = function(){
		let gen = ajax()
		let step = gen.next()
		step.value.then((d)=>{
			if(d.code !== '0'){
				setTimeout(()=>{
					console.log('wait')
					pull()
				},1000)
			}else{
				console.log('完成')
			}
		})
	}

	pull()
}




{
	let classAddName = function(target,name,descriptor){
		target.myName = 'classDescription'
		return descriptor
	}

	@classAddName
	class A{

	}

	// 静态属性
	console.log(A.myName) 
}



{	
	function log(type){
		return function(target,name,descriptor){
			let src_method = descriptor.value
			descriptor.value = (...arg) => {
				src_method.apply(target,arg)
				console.log(`log ${type}`)
			}
			return descriptor
		}
	}

	class AD{
		@log('show')
		show(){
			console.log('show')
		}

		@log('click')
		click(){
			console.log('click')
		}
	}

	let ad = new AD()
	ad.show()
	ad.click()
}



if(module.hot) module.hot.accept()
