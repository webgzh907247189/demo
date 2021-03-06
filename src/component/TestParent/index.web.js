import React,{ Component } from 'react'
import { Route,Switch } from 'react-router-dom'
import ChildrenRoute from 'component/ChildrenRoute'
import './index.less'

class TestParent extends Component{
	constructor(props){
		super(props)
	}

	// this.props.children  它表示组件的所有子节点  数据类型(undefined || object || Array) 
	render(){
		return <div className='test-arent'>
			<div>我的react-router-dom.  现在这个是父组件,背景颜色是黄色的</div>
			<Switch>
				<Route  path='/a/b' component={ChildrenRoute}/>
			</Switch>
		</div>
	}
}

export default TestParent