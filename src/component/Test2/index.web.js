import React,{ Component } from 'react'
import { NavLink } from 'react-router-dom'

class Test2 extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return <div>
			<div>react组件测试555555555555555555</div>
			<NavLink to='test'>navlink跳转test</NavLink>
		</div>
	}
}

export default Test2