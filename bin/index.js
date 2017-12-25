let fs = require('fs')
let path = require('path')
let {join} = path

let findSync = function (startPath) {
  let result = []
  function finder (path) {
    let files = fs.readdirSync(path)

    files.forEach((val, index) => {
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)

      // stats.isDirectory() && finder(fPath)   //深层遍历
      stats.isFile() && result.push(fPath)
    })
  }
  finder(startPath)
  return result
}


let readImg = function (tplPath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(tplPath, 'binary',(err, data) => {    //如果未指定字符编码,则返回原始的 buffer。
      data && resolve(data)                           //'binary' 在读的时候添加的字符编码,在写的时候也需要指定字符编码
      err && reject(err)
    })
  })
}

let writePic = function (target, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(target, data, 'binary',function (err) {    //'binary' 在读的时候添加的字符编码,在写的时候也需要指定字符编码
      err ? reject(err) : resolve(data)
    })
  })
}

let fileTplPath = findSync('./')
let filterFileTplPath = fileTplPath.filter((item) => {
  return /\.png$/.test(item)
})


let picWritePath = '../dist/'  // 生成的图片文件在项目中的具体位置

async function readAndWrite (...args) {
  let [writePath, filterFileTplPath] = args  
  for (let item of filterFileTplPath) {
    let data = await readImg(item)

    let newWritePath = `${picWritePath}${item}`
    newWritePath = path.resolve(__dirname,newWritePath)
    await writePic(newWritePath, data)
  }
}
readAndWrite(picWritePath, filterFileTplPath)