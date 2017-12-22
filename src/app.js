import React from 'react'
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'
import TestNavlink from 'component/TestNavlink'
import Testa from 'component/Testa'
import TestHistory from 'component/TestHistory'
import TestChildren from 'component/TestChildren'
import TestParent from 'component/TestParent'

// import ChildrenRoute from 'component/ChildrenRoute'
// import TestGrandson from 'component/TestGrandson'

// <IndexRoute component={Test}/>

//函数的作用域在定义的时候决定

//////////////////////////
//react-router-dom V4版本(http://blog.csdn.net/u013938465/article/details/78604434) //
//////////////////////////

/**
 *  BrowserRouter：基于浏览器H5 history API的一种Router，推荐使用这种方式
 *  Route : 是路由中最最基础和最最重要的，其path为要匹配地址栏的路径
 *  Redirect ：重定向路由，主要用于匹配无效地址到指定路径
 *  Route exact 使用该模式后，地址是绝对匹配，比如/home 如果不设置exact，当地址为/home/group时也会匹配，但使用之后，则不会。
 *  Switch ： 这个是v4新增加的，是为了保证路由匹配的唯一性，从上往下，一旦匹配上，就不再往后匹配了。
 *  NavLink：和Link一样，文档说NavLink可以自定义激活状态和类名，这里使用NavLink和Link都可，暂没有区别 (路由变化，资源不会重新加载)
 *
 * 	若使用browserHistory，需要对服务端改造(通配)
 */
 

 
const Routers = () => 
	<Router>
		<Switch>
			<Route exact path='/test-navlink' component={TestNavlink} />
			<Route exact path='/testa' component={Testa}/>
			<Route exact path='/test-history' component={TestHistory}/>
			<Route exact path='/test-children' component={TestChildren}/>

			<Route  path='/a' component={TestParent}/>			
			
			<Redirect to='/test-navlink'/>  
		</Switch >
	</Router>


export default Routers