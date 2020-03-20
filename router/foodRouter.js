var express = require('express')
var router = express.Router()
// 引入userModel  数据库操作
const Food = require('../db/model/foodModel')

// 食物添加 /food/add
router.post('/add', (req, res) => {
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
// 食物查询通过分类 /food/getInfoByfoodtype
router.post('/getInfoByfoodtype',(req,res)=>{
  let {foodtype}  = req.body
  Food.find({foodtype})
  .then(data=>{
    res.send({code:200,message:'查询成功',list:data})
  })
  .catch(err=>{
    res.send({code:500,message:'内部错误！！！'})
  })

})
// 食物查询通过关键字 /food/getInfoBykeywords 通过正则匹配
router.post('/getInfoBykeywords',(req,res)=>{
  let {keywords}  = req.body
  let reg = new RegExp(keywords)
  // Food.find({foodname:{$regex:reg}})
  // 匹配 foodname fooddesc
  Food.find({$or:[{foodname:{$regex:reg}},{fooddesc:{$regex:reg}}]})
  .then(data=>{
    res.send({code:200,message:'查询成功',list:data})
  })
  .catch(err=>{
    res.send({code:500,message:'内部错误！！！'})
  })

})
// 删除 /food/del
router.post('/del',(req,res)=>{
  // 删一个
  let {_id}  = req.body
  // 删多个
//  {_id:[id1,id2]}
  Food.deleteOne({_id})
  .then(data=>{
    res.send({code:200,message:'删除成功'})
  })
  .catch(err=>{
    res.send({code:500,message:'内部错误！！！'})
  })

})
// 更改 /food/update  Model.update(conditions, update, [options], [callback])
router.post('/update',(req,res)=>{
  let {
    _id,
    foodname,
    foodtype,
    foodprice,
    fooddesc,
    foodimg,
    foodassess
  } = req.body
  Food.updateOne(
    {_id},
    {   
    foodname,
    foodtype,
    foodprice,
    fooddesc,
    foodimg,
    foodassess})
  .then(data=>{
    res.send({code:200,message:'修改成功'})
  })
  .catch(err=>{
    res.send({code:500,message:'内部错误！！！'})
  })

})

// 分页
router.post('/getInfobypage',(req,res)=>{
  let pagesize = req.body.pagesize || 10
  let pagenum = req.body.pagesize || 1
  Food.find().limit(Number(pagesize)).skip(Number((pagenum -1)*pagesize))
})
module.exports = router

// $or　　　　或关系

// $nor　　　 或关系取反

// $gt　　　　大于

// $gte　　　 大于等于

// $lt　　　　 小于

// $lte　　　 小于等于

// $ne 不等于

// $in 在多个值范围内

// $nin 不在多个值范围内

// $all 匹配数组中多个值

// $regex　　正则，用于模糊查询

// $size　　　匹配数组大小

// $maxDistance　　范围查询，距离（基于LBS）

// $mod　　 取模运算

// $near　　　邻域查询，查询附近的位置（基于LBS）

// $exists　　 字段是否存在

// $elemMatch　　匹配内数组内的元素

// $within　　范围查询（基于LBS）

// $box　　　 范围查询，矩形范围（基于LBS）

// $center 范围醒询，圆形范围（基于LBS）

// $centerSphere　　范围查询，球形范围（基于LBS）

// $slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
