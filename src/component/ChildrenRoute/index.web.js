import React,{ Component } from 'react'
import { Route,Switch } from 'react-router-dom'
import TestGrandson from 'component/TestGrandson'

class ChildrenRoute extends Component{
	constructor(props){
		super(props)
	}
				
	render(){
		console.log(this.props.children)
		console.log('111')
		
		return <div className='children-route' style={{color: 'red'}}>
			<div>现在这个是子组件,字体颜色为红色</div>
			99999999999999999999
			sadsadsa
			<Switch>
				<Route exact path='/a/b/c' component={TestGrandson} />
			</Switch>
		</div>
	}
}

export default ChildrenRoute