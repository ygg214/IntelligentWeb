var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

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
