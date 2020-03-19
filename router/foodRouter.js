var express = require('express')
var router = express.Router()
// 引入userModel  数据库操作
const Food = require('../db/model/foodModel')

// 食物添加 /food/add
router.post('/add', (req, res) => {

  // let data =  {
  //   foodname:'尖椒',
  //   foodtype:'ere',
  //   foodprice:'123',
  //   fooddesc:'46534535',
  //   foodimg:'/public/2.png',
  //   foodassess:'98%'
  // }
  let {
    foodname,
    foodtype,
    foodprice,
    fooddesc,
    foodimg,
    foodassess
  } = req.body;
  if( !foodname || !foodtype || !foodprice || !fooddesc || !foodimg || !foodassess) 
  return res.send({code:400,message:'缺少参数！！！'})
  Food.insertMany({
    foodname,
    foodtype,
    foodprice,
    fooddesc,
    foodimg,
    foodassess
  })
  .then(data=>{
    res.send({code:200,message:'新增成功'})
  })
  .catch(err=>{
    res.send({code:500,message:'内部错误！！！'})
  })
})

module.exports = router