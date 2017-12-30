import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { fetchTest } from '../../actions/testAsync';


@connect(mapStateToProps,mapDispatchToProps)

class TestRedux extends Component{
	
	constructor(props){
		super(props)
	}

	componentDidMount(){
	}
	
	show(){
		let {clickTest,showAge,showData:{fetchTest}={}} = this.props
		clickTest()
		showAge()
		
		fetchTest('异步测试',(data)=>{
			console.log(`异步action发送成功，返回结果解析出错${JSON.stringify(data)}`)
		})
	}

	render(){
		let {name,nameTest,asyncTest1} = this.props

		return <div>
		<div style={{color: 'red'}}>
			<div onClick={ this.show.bind(this) }>redux测试 ： {name}</div>
			<div>{nameTest || '测试'}</div>
			<div>{asyncTest1 || '异步action'}</div>
		</div>
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
		},
		showData: bindActionCreators({fetchTest},dispatch)
	}
}

// export default connect(mapStateToProps,mapDispatchToProps)(TestRedux)
export default TestRedux


//store.dispatch(action)