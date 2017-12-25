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
    fs.readFile(tplPath, (err, data) => {        //'binary' 添加参数能正确读写，但是打开没内容，不添加参数正常
      data && resolve(data)
      err && reject(err)
    })
  })
}

let writePic = function (target, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(target, data, function (err) {
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