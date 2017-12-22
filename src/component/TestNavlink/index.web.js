import React,{ Component } from 'react'
import { NavLink,withRouter,browserHistory,Prompt } from 'react-router-dom'
import './index.less'


/**
 * react-router-dom 使用  http://www.jianshu.com/p/56dce67b8b13   http://www.jianshu.com/p/e3adc9b5f75c/
 * Prompt  当用户离开当前页面前做出一些提示。
 * message: string || func   当用户离开当前页面时，设置的提示信息||  当用户离开当前页面时，设置的回掉函数 
 * when: bool   通过设置一定条件要决定是否启用 Prompt
 */

class TestNavlink extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		let reactTest = this.refs['react-test']
		console.log(reactTest)
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

	leaveRoute(location){
		console.log(location)
		return '确认离开当前页面？'
	}

	getBoolen(){
		let num = new Date().getSeconds()%2 
		console.log(num)
		return num == 1 ? true : false
	}

	render(){
		return (<div>
			<div className='react-test' ref='react-test' onClick={this.jumpClick.bind(this)} >
				react组件测试，使用this.props.location.push()跳转到testa
			</div>
			<Prompt message={ (location)=>{return this.leaveRoute(location) } }  when={ this.getBoolen() }/>
			<NavLink to='/testa'>navlink跳转testa</NavLink>
		</div>)
	}
}

export default TestNavlink