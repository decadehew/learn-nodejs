const {
  normalize,
  join,
  resolve,
  basename,
  dirname,
  extname,
  parse,
  format,
  sep,
  delimiter,
  win32,
  posix
} = require('path')
const mod1 = require('./mod_1')

// console.log(normalize('/usr//local/bin'))

// console.log(join('/usr', 'local', '//bin'))
// console.log(join('/usr', '../local', '//bin'))

/**
 * resolve
 * 把一個相對路徑，解析成相對路徑
 */
// console.log(resolve('./'))


/**
 * basename -> 資料夾名稱
 * dirname -> 所在路徑
 * extname -> 它的拓展名是什麼
 */
// const filePath = '/usr/local/bin/text.txt'
// console.log(basename(filePath))
// console.log(dirname(filePath))
// console.log(extname(filePath))

/**
 * parse -> 把文件名解析成 basename, dirname, extname, 返回對象
 * format -> 把對象給 parse
 */
// const filePath = '/Users/decadehew/Desktop/webapp/frontend-notes/nodejs/learn-node/node.txt'
// const ret = parse(filePath)
// console.log(ret)
// console.log(format(ret))

/**
 * sep -> 路徑 /
 * delimiter -> ：
 * win32 -> 是 window (對象), 查詢 sep 和 delimiter
 * posix -> 
 */

//  console.log('sep ->', sep)
//  console.log('win32.sep ->', win32.sep)
//  console.log('delimiter ->', delimiter)
//  console.log('win32.delimiter ->', win32.delimiter)
//  console.log('posix ->', posix)


/**
 * 實戰：
 * 在 nodejs，載入模組時，都會有包含 __dirname
 * __dirname 和 __filename 返回文件的絕對路徑
 * __dirname -> 所在路徑
 * __filename -> 完全路徑 (文件名)
 * process.cwd() -> 執行 node 所在資料夾
 */
// console.log(mod1.value)
// console.log('__dirname ->', __dirname)
// console.log('__filename ->', __filename)