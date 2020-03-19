var mongoose = require('mongoose');
// 链接数据库
mongoose.connect('mongodb://localhost/local', {useUnifiedTopology: true,useNewUrlParser: true  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db ok')
});