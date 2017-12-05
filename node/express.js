let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.json({type: 'application/json'}))

app.get('/api/data',(req,res,next)=>{
	res.json({name: 'node联调环境数据'})
})



app.set('port',process.env.port || 3000)

let getPort = app.get('port')

let server = app.listen(getPort,()=>{
	let port = server.address().port
	let host = server.address().address
	console.log('服务启动成功  http://%s:%s',host,port)
})

