import React,{ Component } from 'react'
import { NavLink,withRouter } from 'react-router-dom'

class Test extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		const { match, location, history } = this.props
		console.log(location,history)
		// location.push({pathname:'/test3'})
	}

	render(){
		return <div>
			<div className='reat-test'>react组件测试33333333</div>
			<NavLink to='/test1'>navlink跳转test1</NavLink>
		</div>
	}
}

export default Test