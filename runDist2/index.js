
//通过环境变量process.env对象，拿到package.json的字段值
let path = require('path')
let childProcess = require('child_process')

// process.env.port 5000
// process.env.npm_package_version   1.00

let port = process.env.PORT
childProcess.exec(`http-server ./dist -o -p ${port}`)
