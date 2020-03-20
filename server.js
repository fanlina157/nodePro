const express = require('express');
// 链接数据库
const db = require('./db/connect')

const app = express();

// 身份验证 cookie session
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
  resave: true, // 即使session 没有被修改 也保存session 值 默认为true
  saveUninitialized: false, // 无论有没有session cookie 每次请求都设置session cookie
  secret: 'love',
  cookeie:{maxAge:60*100*60*24}  //设置过期时间
}));


// 解析req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// 配置静态资源
const path = require('path')
app.use('/public', express.static(path.join(__dirname, './static')))

// 用户相关的接口
const userRouter = require('./router/userRouter')
app.use('/user', userRouter)
// 食物相关的接口
const foodRouter = require('./router/foodRouter')
app.use('/food',(req,res,next)=>{
  // user 接口存值了， food 接口判断
  let {token} = req.body
  JWT.checkToken(token)
  .then((data)=>{
    next()
  })
  .catch(err=>{
    return res.send({code:444, message:'请先登录'})
  })
  // if(req.session.login) {
  //   next()
  // }else {
  //   return res.send({code:444, message:'请先登录'})
  // }
}, foodRouter)

// 图片上传相关的接口
const fileRouter = require('./router/fileRouter')
app.use('/file', fileRouter)


app.listen(3000, () => {
  console.log('server start')
})