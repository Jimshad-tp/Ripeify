var express = require('express');
const { render } = require('../app');
const productControl = require('../controller/productControl');
var router = express.Router();
const userControl = require('../controller/userControl')
const ProductModel = require('../models/ProductModel');
const orderControl = require("../controller/orderControl")

/* GET home page. */
router.get("/", userControl.userLogin, userControl.checkLogout),
  router.get('/home', productControl.showProduct);
router.get('/login', userControl.checkLogout)

router.get('/signup', userControl.checkSignup, function (req, res, next) {
  const errorMessage = req.flash("message")
  res.render('user/user-signup', { errorMessage: errorMessage,});
});

router.post('/signup', userControl.userRegister)
router.post("/login", userControl.userLogin, (req, res) => {
  if (req.user.isAdmin) {
    res.redirect("/admin")
  }
  else {
    res.redirect("/")
  }
})

router.post("/logout", userControl.userLogout)
router.get('/productPage', productControl.pageProduct)
router.get('/viewProduct/:id', productControl.viewProduct)
router.post('/addtocart/:id', productControl.addTocart)
router.get('/getcart', productControl.getcart)
router.get('/cartItemCount', productControl.cartItemCount)
router.delete('/deleteCartItem/:id', productControl.deleteItem)
router.get("/profile", userControl.getProfile)
router.post("/addAddress", userControl.addAddress)
router.delete('/deleteAddress/:index', userControl.deleteAddress)
router.post('/editAddress/:id', userControl.editAddress)
router.get('/checkout', orderControl.getCheckout)
router.post('/addtowishlist/:id', productControl.addTowishlist)
router.get('/getwishlist', productControl.getWishlist)
router.get('/wishlistItemCount', productControl.wishlistItemCount)




module.exports = router;
