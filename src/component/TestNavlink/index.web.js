import React,{ Component } from 'react'
import { NavLink,withRouter,browserHistory,Prompt } from 'react-router-dom'
import ReactDOM from 'react-dom'
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

		/*  findDOMNode  http://www.css88.com/react/docs/react-dom.html#finddomnode  https://segmentfault.com/q/1010000006198939/a-1020000006201898
		 *  findDOMNode 不能用于函数式组件。
		 *  在大多数情况下，你可以绑定一个 ref 到 DOM 节点上，从而避免使用findDOMNode
		 *  http://blog.csdn.net/dahuzix/article/details/70186397
		 */

		// ReactDOM.findDOMNode(reactTest) === reactTest //true
		console.log(reactTest.style) //margin pading
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

		history.push({pathname:'/testa',search:'?use=props&use=push&b=2#cc=test'})  //默认是加上'?'(search)
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

	asyncTset(){
		const { match, location, history } = this.props
		history.push({pathname:'/async-test',search:'use=asyncTest'})  //默认是加上'?'(search)
	}

	render(){
		return (<div>
			<div onClick={this.asyncTset.bind(this)} className='async-tset'><a>异步加载测试,通过import()</a></div>
			<NavLink to='/ensure-test'>异步加载测试,通过require.Ensure()</NavLink>
			<div className='react-test' ref='react-test' onClick={this.jumpClick.bind(this)} >
				react组件测试，使用this.props.location.push()跳转到testa
				<div className='img-test'></div>
			</div>
			<Prompt message={ (location)=>{return this.leaveRoute(location) } }  when={ this.getBoolen() }/>
			<NavLink to='/testa'>navlink跳转testa</NavLink>
		</div>)
	}
}

export default TestNavlink