import React,{ Component } from 'react'
import { Route,Switch } from 'react-router-dom'
import Bundle from 'component/EnsureBundle'

// webpack2的官网不建议使用require.ensure()   用BundleLoader本质上也是调用require.ensure()


/* require.ensure(dependencies: String[], callback: function(require), errorCallback: function(error), chunkName: String)
 *
 * 第一个参数是一个数组，代表了当前require进来的模块的一些依赖；
 * 第二个参数callback就是一个回调函数。其中需要注意的是，这个回调函数有一个参数require，通过这个require就可以在回调函数内动态引入其他模块。
 * 值得注意的是，虽然这个require是回调函数的参数，理论上可以换其他名称，但是实际上是不能换的，否则webpack就无法静态分析的时候处理它；
 *
 * 第三个参数errorCallback比较好理解，就是处理error的回调
 * 第四个参数chunkName则是指定打包的chunk名
 */


 //我们首先需要一个异步加载的包装组件Bundle。Bundle的主要功能就是接收一个组件异步加载的方法，并返回相应的react组件
const EnsureTest = (props) => (
    <Bundle load={(cb) => {
        require.ensure([], require => {
            cb(require('./test'));
        },'ensureTest');

    }}>
    {(Chat) => <Chat {...props}/>}
  </Bundle>
)

export default EnsureTest
