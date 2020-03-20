var express = require('express')
var router = express.Router()

// 图片上传
const multer = require('multer')

var storage = multer.diskStorage({
  // 设置上传后文件路径，uploads 文件夹自动创建（可以先手动）
  destination: function(req, file, cb) {
    cb(null, './static/img');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})


// 添加配置文件到muler对象。
var upload = multer({ storage: storage });

 
// 文件上传请求处理，upload.array 支持多文件上传，第二个参数是上传文件数目
// upload.single('hehe')  上传一张图片  hehe 就是上传的key 值 前后端统一

router.post('/upload', upload.single('img'), function (req, res) {
  // 读取上传的图片信息
  let {mimetype,filename} = req.file
  // 限制文件类型
  let imgType = ['png','jpg','jpeg','gif']
  let temType = mimetype.split('/')[1]
  if(imgType.indexOf(temType) === -1) {
    return res.send('格式不正确')
  }
  // 把路径返回
  let url = '/public/img/'+filename
  res.send({url:url})
  // file: {
  //   fieldname: 'img',
  //   originalname: '222.png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   destination: './uploads',
  //   filename: '1584687806143-222.png',
  //   path: 'uploads\\1584687806143-222.png',
  //   size: 6268
  // },
 
  // 设置返回结果
  // var result = {};
  // if(!files[0]) {
  //   result.code = 1;
  //   result.errMsg = '上传失败';
  // } else {
  //   result.code = 0;
  //   result.data = {
  //     url: files[0].path
  //   }
  //   result.errMsg = '上传成功';
  // }
  // res.end(JSON.stringify(result));
});

module.exports = router