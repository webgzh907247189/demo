import React,{ Component } from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

class TestHistory extends Component{
	constructor(props){
		super(props)
	}

	static contextTypes = {
	    router: PropTypes.object.isRequired
	}

	jumpClick(){
		let {history} = this.context.router
		console.log(history)
		history.push({pathname: '/test-children',search:'?use=context&use=router&d=2'})
	}

	render(){
		return <div>
			<div onClick={this.jumpClick.bind(this)}>react组件测试使用context.router.history.push()对象跳转</div>
			<NavLink to='test-children'>navlink跳转test-children</NavLink>
		</div>
	}
}

export default TestHistory