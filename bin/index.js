let fs = require('fs')
let path = require('path')
let {join} = path

findSync = function (startPath) {
  let result = []
  function finder (path) {
    let files = fs.readdirSync(path)

    files.forEach((val, index) => {
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)

      // stats.isDirectory() && finder(fPath)
      stats.isFile() && result.push(fPath)
    })
  }
  finder(startPath)
  return result
}


readImg = function (tplPath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(tplPath, 'utf8', (err, data) => {
      data && resolve(data)
      err && reject(err)
    })
  })
}
writePic = function (target, data, isHtml) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(target, data, function (err) {
      err ? reject(err) : resolve(data)
    })
  })
}


let fileTplPath = findSync(path.resolve(__dirname,'../'))
let filterFileTplPath = fileTplPath.filter((item) => {
  return /\.png$/.test(item)
})
// console.log(filterFileTplPath)


let picWritePath = './dist'      // 生成的图片文件在项目中的具体位置
async function readAndWrite (...args) {
  let [writePath, filterFileTplPath] = args

  for (let item of filterFileTplPath) {
    let data = await readImg(item)
    await writePic(writePath, data)
  }
}
readAndWrite(picWritePath, filterFileTplPath)