const express = require('express');
// 链接数据库
const db = require('./db/connect')

const app = express();

// 解析req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 用户相关的接口
const userRouter = require('./router/userRouter')
app.use('/user', userRouter)

app.listen(3000,()=>{
  console.log('server start')
})