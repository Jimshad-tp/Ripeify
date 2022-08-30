var express = require('express');
const { render } = require('../app');
var router = express.Router();
const userControl = require('../controller/userControl')

/* GET home page. */
router.get('/', function(req, res, next) {
  const user=req?.user
  res.render('home',{user:user});
});

router.get('/login',userControl.checkLogout, function(req, res, next) {
  
  res.render('user/user-login');
});

router.get('/signup',userControl.checkLogout, function(req, res, next) {
  res.render('user/user-signup');
});

router.post('/signup',userControl.userRegister)

router.post("/login",userControl.userLogin,(req,res)=>{
  if(req.user.isAdmin){
    res.redirect("/admin")
  }
  else{
    res.redirect("/")
  }
}),


router.post("/logout",userControl.userLogout)

router.get('/product',(req,res)=>{
res.render('user/product')
})


module.exports = router;
