import React,{ Component } from 'react'
import { Route } from 'react-router-dom'

class TestGrandson extends Component{
	constructor(props){
		super(props)
	}
				
	render(){
		console.log('孙子组件渲染')
		return <div className='test-grandson' style={{color: 'blue'}}>
			<div>现在这个是孙子组件,字体颜色为蓝色</div>
		</div>
	}
}

export default TestGrandson