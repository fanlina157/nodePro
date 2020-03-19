var express = require('express')
var router = express.Router()
// 引入userModel  数据库操作
const User = require('../db/model/userModel')


// 用户注册 /user/reg
router.post('/reg', function (req, res) {
  // 获取数据
  let {username, password} = req.body
  if(!username || !password) return res.send({code:400,message:'用户名及密码必填！！！'})
  // 数据处理
  // 判断数据库里存在？
  User.find({username}).then(data=>{
    if(data.length > 0) {
      res.send({code:405,message:'用户名已存在'})
    }else {
      return  User.insertMany({username,password})
    }
  })
  .then(data=>{
    res.send({code:200,message:'注册成功'})
  })
  .catch(err=>{
    res.send({code:500,message:'注册错误'})
  })
})

// 用户登录 /user/login
router.post('/login', function (req, res) {
  // 获取数据
  let {username, password} = req.body
  if(!username || !password) return res.send({code:400,message:'用户名及密码必填！！！'})
  // 数据处理
  User.find({username,password})
  .then(data=>{
    // console.log(data) 数组
    if(data.length > 0) {
       res.send({code:200,message:'登录成功'})
    }else {
      res.send({code:401,message:'用户名或密码错误'})
    }
  
  })
  .catch(err=>{
    res.send({code:500,message:'内部错误'})
  })
})
 
module.exports = router