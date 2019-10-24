/* */
window.$ = function () {}
$.dajax = function ({ method, url, body, successFn, errorFn, headers }) {
  // Destructuring assignment
  // let { method, url, successFn, errorFn, headers } = opts

  let request = new XMLHttpRequest()
  request.open(method, url)
  // request.setRequestHeader('decadehew', '1000')
  // request.setRequestHeader('Content-Type', 'x-www-form-urlencoded')
  for (let property in headers) {
    request.setRequestHeader(property, headers[property])
  }
  request.send(body)
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      console.log('請求 response 完畢')
      if (request.status >= 200 && request.status <= 300) {
        console.log('請求成功！')
        successFn(request.responseText)
      } else if (request.status >= 400) {
        console.log('請求失敗！')
        errorFn(request.responseText)
      }
    } 
  }
}

btn.addEventListener('click', (e) => {
  $.dajax({
    url: '/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'decadehew': 10000
    },
    successFn: function (data) {
      let object = JSON.parse(data)
      console.log(object)
    },
    errorFn: function (err) {
      console.log(err)
    }
  })
})