const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel")

module.exports = {
  placeOrder: async (req, res, next) => {
    try {
      console.log(req.body, 'checkout in..........');
      const userId = req.user.id
      const checkout = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        house: req.body.house,
        address: req.body.address,
        city: req, body, city,
        pincode: req.body.pincode,
        phone: req.body.phone
      })
      await checkout.save()
      console.log("address saved in database")
      res.redirect('/getcart')
    } catch (error) {
      console.log(error)

    }
  },
  getCheckout: async (req, res) => {
    try {
      const userId = req.user.id
      const user = await userModel.findById(userId, { email: 1, Address: 1 })
      const findCart = await cartModel.findOne({ userId: userId }).populate("products", "productId")
      if(findCart.products.length>0){
        res.render('user/checkout', { findCart, user })
      }else{
        res.render("user/shoping-cart")
      }

    } catch (error) {
      console.log(error);
    }
  }
}