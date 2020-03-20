const jwt = require('jsonwebtoken')
// 产生一个token
let secret = 'ddjfldsjgoweore3043'
// 不放隐秘数据
let payload = {
  us:123,
  ps:456
}
let token = jwt.sign(payload,secret)
console.log(token)

// 验证token
jwt.verify(token,secret,(err,data)=>{
  console.log(err)
  console.log(data)
})

// 封装成2个函数