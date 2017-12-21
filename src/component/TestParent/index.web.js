import React,{ Component } from 'react'
import './index.less'

class TestParent extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return <div className='test-arent'>
			<div>我的react-router-dom.  现在这个是父组件,背景颜色是黄色的</div>
			{this.props.children}
		</div>
	}
}

export default TestParent