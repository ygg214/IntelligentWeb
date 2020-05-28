var express = require('express');
var router = express.Router();

//get data
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate.toString();
}
var datatime = 'public/images/'+getNowFormatDate();
var multer = require('multer')
var storage = multer.diskStorage({
  destination: datatime,
  filename: function (req, file, cb) {
    cb(null,  file.originalname);
  }
});
var upload = multer({
  storage: storage
});

router.post('/post',upload.single('picUrl'),function(req,res,next){
  var url = datatime +'/'+ req.file.originalname;
  res.render('post',{title:url});
  // //将其发回客户端
  // res.json({
  //   code : 1,
  //   data : url
  // });
  // res.end();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World!' , login_is_correct: true});
});
router.get('/post',function(req,res,next) {
  res.render('post',{title:'Post Page'});
})
router.get('/wall',function(req,res,next) {
  res.render('wall',{title:'Story Wall'});
})

/*POST home page*/
router.post('/mainpage', function(req,res,next){
  var login = req.body.user;
  if(login == 'user1'|| login == 'user2'){
    res.render('mainpage',{title:login, login_is_correct: true});
  }else {
    res.render('index',{title:'Hello World', login_is_correct:false});
  }
});

router.post('/post',function (req,res,next) {
  var postData = req.body;
  if(postData==null){
    res.status(403).send('No data sent!')
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(postData));
})


module.exports = router;
