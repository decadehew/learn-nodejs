# 測試 Ajax Cors
根據我寫[文章](https://decadehew.github.io/2019/07/10/cors-ajax/)來手動體驗！

## Step 1

```bash
vi /etc/hosts

127.0.0.1 decadehew.com (角度：前端)
127.0.0.1 jackma.com (角度：後端)
```

## Step 2

```bash
// terminal


// 開啟兩個 server
// 一個是decadehew.com:8001
// 一個是jackma.com:8002

nodemon app.js 8001
nodemon app.js 8002
```

## Step 3
打開 `browser` 輸入 `http://decadehew.com:8001`
接下來打開 `Developer tools`, 選擇 Network 查看response
