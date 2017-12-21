import React,{ Component } from 'react'
import { NavLink,withRouter,browserHistory } from 'react-router-dom'
import './index.less'

class TestNavlink extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		let reactTest = this.refs['react-test']
	}

	jumpClick(){
		const { match, location, history } = this.props
		/**
		 * {pathname: "/test", search: "", hash: "", state: undefined, key: "2zmkjx"}
		 * 
		 * hash:""
		 * key:"2zmkjx"
		 * pathname:"/test"
		 * search:""    
		 * state:undefined
		 */
		console.log(location)

		history.push({pathname:'/testa',search:'?use=props&use=push&b=2'})  //默认是加上'?'(search)
	}

	render(){
		return (<div>
			<div className='react-test' ref='react-test' onClick={this.jumpClick.bind(this)} >
				react组件测试，使用this.props.location.push()跳转到testa
			</div>
			<NavLink to='/testa'>navlink跳转testa</NavLink>
		</div>)
	}
}

export default TestNavlink