import fetch from "isomorphic-fetch";

export function fetchTest(descripton,cb) {
	return dispatch=>{
		fetch('/api/data')
        .then(function(res) {
          return res.json();
        })
        .then(data => {
                if (data.sex == '222') {   //(“1” == true,true首先转换为1，然后再执行比较。接下来字符串“1”也转换成了数字1，相等，所以返回true  ->  转为数字比较)  涉及toString valueOf
                    dispatch({
                        type: 'asyncTest',
                        payload: '异步请求完成挂载数据'   //挂载数据
                    })
                } else {
                    cb(data);
                }
            }
        )
	}
}

export function showAge(data){
    return {
        type: 'showName',
        data
    }
}


//store.dispatch(action)


//https://segmentfault.com/q/1010000008163213

// redux只能dispatch一个action,使用 redux-thunk 之后，可以dispatch一个函数了，这个函数会接收dispatch, getState作为参数，
// 在这个函数里你就可以干你想干的事情，在任何地方随意dispatch了