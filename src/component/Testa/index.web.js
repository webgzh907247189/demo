import React,{ Component } from 'react'
import Jump from './Jump'

class Testa extends Component{
	
	constructor(props){
		super(props)
	}
	
	render(){
		return <div>
			<Jump/>
			<a href='/test-history'>a标签跳转到test-history</a>
		</div>
	}
}

export default Testa