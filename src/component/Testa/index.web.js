import React,{ Component } from 'react'
import Jump from './Jump'
import {getLocationQuery} from 'util/index'

class Testa extends Component{
	
	constructor(props){
		super(props)
	}

	componentDidMount(){
		let obj = getLocationQuery()
		console.log(obj)
	}
	
	render(){
		return <div>
			{/*jump组件(注释)*/}
			<Jump/>
			<a href='/test-history'>a标签跳转到test-history。111111</a>
		</div>
	}
}

export default Testa