import React,{ Component } from 'react'
import { connect } from 'react-redux'

class TestRedux extends Component{
	
	constructor(props){
		super(props)
	}

	componentDidMount(){
	}
	
	show(){
		let {clickTest,showAge} = this.props
		clickTest()
		showAge()
	}

	render(){
		let {name,nameTest} = this.props

		return <div>
			<div onClick={ this.show.bind(this) }>redux测试 ： {name}</div>
			<div>{nameTest || '测试'}</div>
			<a href='/test-history'>a标签跳转到test-history。redux测试</a>
		</div>
	}
}

function mapStateToProps(state){
	console.log(state)
	return state.testReducer
}
function mapDispatchToProps(dispatch){
	return {
		clickTest(){
			dispatch({
				type: 'click'
			})
		},
		showAge(){
			dispatch({
				type: 'showName'
			})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TestRedux)