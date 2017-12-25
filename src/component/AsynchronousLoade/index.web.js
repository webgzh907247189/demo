import React,{ Component } from 'react'
import { Route,Switch } from 'react-router-dom'
import CommonBundle from 'component/CommonBundle'


//这里的import不同于模块引入时的import，可以理解为一个动态加载的模块的函数(function-like)，传入其中的参数就是相应的模块

// 我们首先需要一个异步加载的包装组件CommonBundle。CommonBundle的主要功能就是接收一个组件异步加载的方法，并返回相应的react组件：
const Chat = (props) => (
    <CommonBundle load={() => import('./chat')}>   
        {(Chat) => <Chat {...props}/>}
    </CommonBundle>
);

export default Chat
