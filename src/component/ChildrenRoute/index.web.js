import React,{ Component } from 'react'
import { Route } from 'react-router-dom'
import TestGrandson from 'component/TestGrandson'

class ChildrenRoute extends Component{
	constructor(props){
		super(props)
	}
				
	render(){
		return <div className='children-route' style={{color: 'red'}}>
			<div>现在这个是子组件,字体颜色为红色</div>
			99999999999999999999
			sadsadsa
			{this.props.children}
		</div>
	}
}

export default ChildrenRoute