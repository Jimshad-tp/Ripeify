var express = require('express');
const { response } = require('../app');
var router = express.Router();
const adminControl = require("../controller/adminControl");
const categoryModel = require('../models/categoryModel');
const userModel = require('../models/userModel')

/* GET users listing. */


//admin login
router.get('/', adminControl.adminlogin, function (req, res, next) {
  console.log('admin login');
  res.render('admin/admin-home');
});

//admin logout
router.get('/', adminControl.adminlogout, function (req, res, next) {
  console.log('admin logout');
  res.redirect('/')
});

router.get('/getuserdata', adminControl.getuserdata, async function (req, res, next) {
  try {
    const users = await userModel.find({})
    res.render('admin/user-manage', { users: users,layout:'layout/usermanage-layout'});
  } catch (err) {
    console.log(err)
  }
});

router.post("/blockuser/:id", adminControl.blockUser)
router.post('/activeUser/:id',adminControl.activeUser)

router.get('/getcategory',adminControl.getcategory,async (req,res)=>{
  try{
    const categories = await categoryModel.find().sort({categoryName:1})
    res.render('admin/category-manage',{categories:categories,layout:'layout/usermanage-layout'})
  }catch(err){
    console.log(err);
  }
})

router.post('/addCategory',adminControl.addcategory)
router.post('/editCategory',adminControl.editCategory)





module.exports = router;
