let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')

let api = require('./api')
let { port } = require('./config')
let app = express()

app.use(bodyParser.json({type: 'application/json'}))

app.get('/api/data',(req,res,next)=>{
	res.json({name: '2222222222222'})
})

app.get('/',(req,res,next)=>{
	res.json({name: '111111111111111'})
})


app.set('port',process.env.port || port)

let getPort = app.get('port')

let server = app.listen(getPort,()=>{
	let port = server.address().port
	let host = server.address().address
	console.log('服务启动成功  http://%s:%s',host,port)
})

