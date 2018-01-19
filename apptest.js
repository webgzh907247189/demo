import arrMap from './src/common'
import attachFastClick from 'fastclick'
import {objToArr} from 'util/index'
import _ from 'lodash'
import fetch from "isomorphic-fetch";

console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))


attachFastClick.attach(document.body)

// import $ from 'jquery'
// let aa = $('#aa').html()
// console.log(aa)

let arr = ['a','b','c']
arrMap(arr)




fetch('/api/post',{
	 method: 'post',
	 credentials: 'include',
	 headers: {
	 	'Accept': 'application/json, text/plain,*/*',
	 	'Content-type': 'application/x-www-form-urlencoded'
	 },
	 body: JSON.stringify({a: 1,b: 2})
})
.then(function(res) {
  // return res.text(); //转为字符串
  return res.json();
})
.then(data => {
		console.log('fetch测试',typeof(data))
        console.log(data)
    }
)



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
	let obj = {name: 'sh',sex: '男',age: '19'}
	Reflect.deleteProperty(obj,'name')		// Reflect.deleteProperty() 删除使用的是 -> 键名
	console.log(obj)

	delete obj.name                        // delete obj.name 删除使用的是 -> 键值
}
{
	function pick(obj){
		// let argArr = Array.prototype.slice.call(arguments)
		let argArr = [...arguments]

		return argArr.reduce((result,item)=>{
			// result[item] = obj[item]
			// if(!obj[item]){
			// 	delete result[item]
			// }
			
			// (result[item] = obj[item]) || delete result[item]
			(result[item] = obj[item]) || Reflect.deleteProperty(result,item)

			return result
		},Object.create(null))
	}

	let result = pick({name: 'sh',sex: '男',age: '19'},'sex','age')
	console.log(result)   // {sex: "男", age: "19"}
}
{
	function pick(obj,...keys){
		return keys.reduce((result,item)=>{

			// (result[item] = obj[item]) || delete result[item]
			(result[item] = obj[item]) || Reflect.deleteProperty(result,item)

			return result
		},Object.create(null))
	}

	let result = pick({name: 'sh',sex: '男',age: '19'},'sex','age','name','aaa')
	console.log(result)   // {sex: "男", age: "19"}
}
{	
	let obj = {name: 'sh',sex: '男',age: '19'}
	let o = JSON.parse(JSON.stringify(obj,['sex','age']))
	console.log(o)
}





{
	0b11111  /** 31 （二进制转为10进制）*/   31 .toString(2)       Number('0b11111')
	0o26     /** 22 （八进制转为10进制） */  22 .toString(8)		 Number('0o26')
	0x16     /** 22 （十六进制转为10进制）*/ 22 .toString(16)		 Number('0x16')


	{	
		/**
		 *  $ 合并找0  | 合并找1  （如果对非数值应用位操作符，会先使用Number()函数将该值转换为一个数值（自动完成），然后再应用位操作。得到的结果将是一个数值。）
		 */
		// num1是1和0进行“按位与”操作后的返回值。1的二进制码简写为1，0的二进制码简写为0，根据上面的规则，第二个操作符数为0，结果是0
		var num1 = 1 & 0;
		console.log(num1); // 0 

		// 第一个操作符数是字符串，按照前言里面的理论，对于非数值的操作符数，先使用Number()函数处理，结果返回NaN，NaN又会被当成0来处理。所以最终结果也是0
		var num2 = 'string' & 1;
		console.log(num2); // 0

		// true是布尔类型值，同样使用Number()函数处理，处理后得到数值1，于是表达式就相当于“1 & 1” 进行位运算，当两个数值都为1的时候，结果返回1
		var num3 = true & 1;
		console.log(num3); // 1

		// 23的二进制码是：...10111，5的二进制码是：...00101。然后每一位进行对齐处理，结合上面的规则，可以得出10111&00101的结果是：00101。00101就是5
		var num6 = 23 & 5;
		console.log(num6); // 5 

		// 再加个例子：24的二进制码为...11000，7的二进制码为...00111，相同位置的两个数执行AND操作，结果发现结果是...00000。所以最终结果是0，你算对了吗？
		var add1 = 24 & 7;
		console.log(add1); // 0
	}
	{
		// 第一个操作符数为undefined，第二个操作符数是false，均不是数值，所以都要先使用Number()函数处理，处理结果都是返回NaN，NaN又会被当成0处理，于是最终结果是0
		var num4 = undefined | false;
		console.log(num4); // 0

		// 第一个操作符数相当于0，第二个操作符数相当于1，结合按位或的规则，最终结果是1
		var num5 = undefined | true;
		console.log(num5); // 1

		// 23的二进制码是：...10111，5的二进制码是：...00101。然后每一位进行对齐处理，结合上面的规则，可以得出10111|00101的结果是：10111。10111就是23
		var num7 = 23 | 5;
		console.log(num7); // 23

		// 再加个例子：24的二进制码为...11000，7的二进制码为...00111，相同位置的两个数执行AND操作，结果发现结果是...11111。所以最终结果是31，你算对了吗？
		var add2 = 24 | 7;
		console.log(add2); // 31
	}
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
