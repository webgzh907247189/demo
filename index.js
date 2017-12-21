import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import attachFastClick from 'fastclick'
import App from './src/app.js'
 
attachFastClick.attach(document.body)

/**
 * 应用包裹在 <AppContainer>，当发生更新所有 <AppContainer> 的 children 会 reloaded。
 * @zhonghao.ge                          Copyright (c)           ANHUI
 * @DateTime    2017-12-17T16:02:27+0800
 */
const render = (App) => {
	ReactDOM.render(
      	<AppContainer>
        	<App/>
    	</AppContainer>,
    document.getElementById('root')
    );
}
render(App)



if(module.hot) module.hot.accept('./src/app.js',()=>{ render(App) })
