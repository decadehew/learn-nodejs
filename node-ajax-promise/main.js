/* */
window.$ = function () {}
$.dajax = function ({ method, url, body, headers }) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest()
    request.open(method, url)
    for (let property in headers) {
      request.setRequestHeader(property, headers[property])
    }
    request.send(body)
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        console.log('請求 response 完畢')
        if (request.status >= 200 && request.status <= 300) {
          console.log('請求成功！')
          resolve(request.responseText)
        } else if (request.status >= 400) {
          console.log('請求失敗！')
          reject(request.responseText)
        }
      } 
    }
  })
}

btn.addEventListener('click', (e) => {
  $.dajax({
    url: '/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'decadehew': 10000
    }
  })
  .then(
    (data) => {
      let object = JSON.parse(data)
      console.log(object)
    },
    (fail) => {
      console.log(fail)
    }
  )
})