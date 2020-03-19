var mongoose = require('mongoose');
// schema 对象
var FoodSchema = new mongoose.Schema({
  foodname:{type:String,required:true},
  foodtype:{type:String,required:true},
  foodprice:{type:String,required:true},
  fooddesc:{type:String,required:true},
  foodimg:{type:String,required:true},
  foodassess:{type:String,required:true}
});
// 转数据模型
const Food = mongoose.model('Food', FoodSchema);
module.exports= Food