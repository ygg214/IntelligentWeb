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
var picUrl = 'images/' + getNowFormatDate();
var datatime = 'public/'+picUrl;
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

router.post('/post_pic',upload.single('file'),function(req,res,next){
  var url = picUrl +'/'+ req.file.originalname;
  // console.log(url);
  //将其发回客户端
  res.json({
    code : 1,
    data : url
  });
  res.end();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World!'});
});
router.get('/post',function(req,res,next) {
  res.render('post',{title:'Post Page'});
})
router.get('/wall',function(req,res,next) {
  res.render('wall',{title:'Story Wall'});
})

/*POST home page*/
router.post('/rating',function (req,res,next) {
  var postData = req.body;
  if(postData==null){
    res.status(403).send('No data sent!')
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(postData));
})

router.post('/post',function (req,res,next) {
  var postData = req.body;
  if(postData==null){
    res.status(403).send('No data sent!')
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(postData));
})

/**
 *
 * @param userId
 * @param ratings
 * @constructor
 */
class User{
  constructor (userId, ratings) {
    this.userId= userId;
    this.ratings= ratings;
  }
}
/**
 *
 * @param storyId
 * @param userId
 * @param text
 * @param picture
 * @constructor
 */
class Story{
  constructor (storyId, userId, text, picture) {
    this.storyId= storyId;
    this.userId= userId;
    this.text= text;
    this.picture= picture;
  }
}

module.exports = router;
