const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if(!port){
  console.log('指定 port 謝謝')
  process.exit(1)
}

const server = http.createServer((request, response) => {
  // console.log(request)
  let parseUrl = url.parse(request.url, true)
  let pathWithQuery = request.url
  let queryString = ''
  if (pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  let path = parseUrl.pathname
  let query = parseUrl.query
  let method = request.method
  


  if (path === '/'){
    let string = fs.readFileSync('./index.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path==='/main.js'){
    let string = fs.readFileSync('./main.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path==='/info'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', 'http://decadehew.com:8001') // 指定
    response.write(`
    {
      "me": {
        "name": "DecadeHew",
        "title": "FrontEnd Developer",
        "from": "Malaysia",
        "Now": "Taichung"
      }
    }
    `)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      {
        "error": "not found"
      }
    `)
    response.end()
  }
})



server.listen(port, () => {
  console.log('server started')
})