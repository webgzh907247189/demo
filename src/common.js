import 'style/test.css'
import 'style/minify-min.css'

function arrMap(arr){
	arr.map((item)=>{
		console.log(item+1)
		return item+1
	})
}
console.log('热加载测试')

export { arrMap as default } 

/*
 * default  只能导出一个模块，不能导出多个
 * 导出多个模块用 export { xx,yyy }
 *
 */
