import React,{ Component } from 'react'
import { withRouter } from 'react-router-dom'

@withRouter
class Jump extends Component{
	
	constructor(props){
		super(props)
	}

	jumpClick(){
		const { match, location, history } = this.props
		console.log(location)

		history.push({pathname: '/test-history',search: '?use=@withRouter'})
	}

	render(){
		return <div>
			<div onClick={this.jumpClick.bind(this)}>react组件测试，使用@withRouter进行路由跳转到test-history</div>
		</div>
	}
}

export default Jump