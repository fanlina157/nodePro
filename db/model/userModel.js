var mongoose = require('mongoose');
// schema 对象
var userSchema = new mongoose.Schema({
  username:{type:String,required:true},
  password:{type:String,required:true},
  age:Number,
  sex:{type:String,default:0},
});
// 转数据模型
const User = mongoose.model('user', userSchema);
module.exports= User