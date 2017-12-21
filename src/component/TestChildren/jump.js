import React,{ Component } from 'react'


function jumpClick(history){
	console.log(history)
	history.push({pathname:'/test-navlink',search:''})  //
}

const Jump = ({history}) => {	
	return <div>
		<div onClick={ () => {jumpClick(history)} }>react组件测试,在Route children使用location进行路由跳转到test-navlink</div>
	</div>
}

export default Jump