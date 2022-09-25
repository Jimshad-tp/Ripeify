var express = require('express');
const { render } = require('../app');
const productControl = require('../controller/productControl');
var router = express.Router();
const userControl = require('../controller/userControl')
const ProductModel = require('../models/ProductModel');
const orderControl = require("../controller/orderControl")

/* GET home page. */
router.get('/',productControl.showProduct);

router.get('/login',userControl.checkLogout, function(req, res, next) {

  res.render('user/user-login');
});

router.get('/signup',userControl.checkLogout, function(req, res, next) {
  const errorMessage = req.flash("message")
  res.render('user/user-signup',{errorMessage:errorMessage,layout:"layout/layout"});
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


router.get('/productPage',productControl.pageProduct)
router.get('/viewProduct/:id',productControl.viewProduct)
router.post('/addtocart/:id',productControl.addTocart)
router.get('/getcart',productControl.getcart)
router.get('/cartItemCount',productControl.cartItemCount)
router.delete('/deleteCartItem/:id',productControl.deleteItem)

router.get("/profile",userControl.getProfile)
router.post("/addAddress",userControl.addAddress)
router.delete('deleteAddress/:index',userControl.deleteAddress)

router.get('/checkout',(req,res) =>{
  res.render('user/checkout')
})
router.post("/placeorder",orderControl.checkout)
router.post('/addtowishlist/:id',productControl.addTowishlist)
router.get('/getwishlist',productControl.getWishlist)
router.get('/wishlistItemCount',productControl.wishlistItemCount)




module.exports = router;
