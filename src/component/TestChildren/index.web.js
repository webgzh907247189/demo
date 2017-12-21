import React,{ Component } from 'react'
import Jump from './Jump'

class TestChildren extends Component{
	
	constructor(props){
		super(props)
	}
	
	render(){
		const { match, location, history } = this.props

		return <div>
			<Jump history={history}/>
			<a href='/test-navlink'>a标签跳转到test-navlink</a>
		</div>
	}
}

export default TestChildren