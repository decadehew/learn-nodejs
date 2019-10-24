const fs = require('fs');

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    })
    req.on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body);
    })
  })
  return promise
}

const sessions = {};

const serverHandler = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  // 解析 cookie
  req.cookie = {};
  // k1=v1;k2=v2;
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if (!item) return;
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1];
    req.cookie[key] = val; // {k1: v2, k2:v2}
  })

  if (path === '/') {
    let string = fs.readFileSync('./client/index.html', 'utf8');
    let users = fs.readFileSync('./db/users', 'utf-8');
    let foundUser = '';

    console.log('COOKIE', req.cookie)
    try {
      users = JSON.parse(users)
    } catch (err) {
      users = []
    }
    let parseSession = sessions[req.cookie['sessionID']] || {}

    for (let i=0; i<users.length; i++) {
      let user = users[i];
      if (user.email === parseSession['userEmail']) {
        foundUser = user.email
        break;
      }
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    if (foundUser) {
      string = string.replace('__email__', foundUser);
      string = string.replace('__login__', '')
    } else {
      string = string.replace('__email__', '還沒登入');
      string = string.replace('__login__', '<a href="/sign_in">登入</a>')
    }
    
    res.write(string)
    res.end();
  } else if (method === 'GET' && path === '/sign_up') {
    if (req.cookie['userEmail']) {
      res.writeHead(301,
        {Location: '/'}
      );
      res.end();
      return;
    }
    let string = fs.readFileSync('./client/sign_up.html', 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.write(string);
    res.end();
  } else if (method === 'POST' && path === '/sign_up') {
    let header = req.headers['content-type'].split(';')[0];
    // console.log(header)
    getPostData(req)
      .then(body => {
        if (header === 'application/x-www-form-urlencoded') {
          // console.log(body)
          let arr = body.split('&');
          let obj = {};
          arr.forEach(item => {
            let parts = item.split('=');
            let key = parts[0];
            let val = parts[1];
            obj[key] = decodeURIComponent(val);
          })
          // console.log(obj)
          let {email, password, confirm_password} = obj;
          if (email.indexOf('@') === -1) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.write(`{
              "errors": {
                "email": "invalid"
              }
            }`);
          } else if (password !== confirm_password) {
            res.statusCode = 400;
            // res.write('密碼不匹配');
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.write(`{
              "errors": {
                "confirm_password": "密碼不匹配"
              }
            }`)
          } else {
            console.log('okok')
            let users = fs.readFileSync('./db/users', 'utf-8');
            let isUse = false;
            try {
              users = JSON.parse(users)
            } catch (err) {
              users = []
            }
            for (let i=0; i<users.length; i++) {
              let user = users[i];
              if (user.email === email) {
                isUse = true;
                break;
              }
            }
            if (isUse) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json;charset=utf-8')
              res.write(`{
                "errors": {
                  "emailInUse": "invalid"
                }
              }`);
            } else {
              users.push({email, password})
              fs.writeFileSync('./db/users', JSON.stringify(users))
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json;charset=utf-8')
              res.write(`{
                "success": {
                  "msg": "成功"
                }
              }`)
            }
          }
          res.end();
        }
      })
  } else if (method === 'GET' && path === '/sign_in') {
    if (req.cookie['userEmail']) {
      res.writeHead(301,
        {Location: '/'}
      );
      res.end();
      return;
    }
    let string = fs.readFileSync('./client/sign_in.html', 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.write(string);
    res.end();
  } else if (method === 'POST' && path === '/sign_in') {
    let header = req.headers['content-type'].split(';')[0];
    getPostData(req)
      .then(body => {
        if (header === 'application/x-www-form-urlencoded') {
          // console.log(body)
          let arr = body.split('&');
          let obj = {};
          arr.forEach(item => {
            let parts = item.split('=');
            let key = parts[0];
            let val = parts[1];
            obj[key] = decodeURIComponent(val);
          })

          let {email, password} = obj;
          let users = fs.readFileSync('./db/users', 'utf-8');
          let found = false;
          try {
            users = JSON.parse(users)
          } catch (err) {
            users = []
          }
          for (let i=0; i<users.length; i++) {
            let user = users[i];
            if (user.email === email && user.password === password) {
              found = true;
              break;
            }
          }
          if (found) {
            let session_id = Math.random() * 1000;
            sessions[session_id] = {userEmail: email}
            res.setHeader(`Set-Cookie`, `sessionID=${session_id}; httpOnly;`)
            res.statusCode = 200;
          } else {
            res.statusCode = 401;
          }
          res.end();
        }
      })
  }
}

module.exports = serverHandler;