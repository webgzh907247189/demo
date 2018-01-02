import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { fetchTest,showAge } from '../../actions/testAsync';


@connect(mapStateToProps,mapDispatchToProps)

class TestRedux extends Component{
	
	constructor(props){
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	componentDidMount(){
	}

	// shouldComponentUpdate(nextProps,nextState){
		//return true   //默认返回true,在state更新，props更新   默认是更新的(默认return true)，通过PureRenderMixin来处理那些情况不需要更新
	// }
	
	show(){
		let {clickTest,showData:{fetchTest,showAge}={}} = this.props
		clickTest()
		showAge({des: '这是redux测试'})
		
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
		// showAge(){
		// 	dispatch({
		// 		type: 'showName'
		// 	})
		// },

		//store.dispatch(action)

		showData: bindActionCreators({fetchTest,showAge},dispatch)
	}
}

// export default connect(mapStateToProps,mapDispatchToProps)(TestRedux)
export default TestRedux


//store.dispatch(action)