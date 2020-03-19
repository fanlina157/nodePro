const express = require('express');
// 链接数据库
const db = require('./db/connect')

const app = express();

// 解析req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置静态资源
const path = require('path')
app.use('/public',express.static(path.join(__dirname,'./img')))

// 用户相关的接口
const userRouter = require('./router/userRouter')
app.use('/user', userRouter)
// 食物相关的接口
const foodRouter = require('./router/foodRouter')
app.use('/food', foodRouter)


app.listen(3000,()=>{
  console.log('server start')
})