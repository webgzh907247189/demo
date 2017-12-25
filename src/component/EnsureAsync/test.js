import React,{ Component } from 'react'

export default class Test extends Component {
    constructor(props) {
        super()
    }

    render() {
        return <div>
            使用require.ensure()
            测试异步加载
        </div>
    }
}