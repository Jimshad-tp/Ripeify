
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel")
const cartModel = require("../models/cartModel")

module.exports = {
  placeOrder: async (req, res, next) => {


    try { 
    const userId = req.user.id
    const address = req.body.myAddress
    const paymentType =req.body.paymentType

    const user = await userModel.findById(userId)
    const cart = await cartModel.findOne({userId})


    const couponCode = req.session.coupon?.code
    const couponId = req.session.coupon?.id
    const couponDiscount = req.session.coupon?.discount

  const newOrder = new orderModel({
    userId : userId,
    deliveryAddress : address,
    products :cart.products,
    quantity :cart.quantity,
    subtotal : cart.subTotal,
    total :cart.total,
    paymentType : paymentType
    })
newOrder.save()
return res.status(200).json({message : "cash on delivery order placed"})

    } catch (error) {
   

    }
  },
  getCheckout: async (req, res) => {
    try {
      const userId = req.user.id
      const user = await userModel.findById(userId, { email: 1, Address: 1 })
      const findCart = await cartModel.findOne({ userId: userId }).populate("products", "productId")

      const couponCode = req.session.coupon?.code;
      const couponDiscount = req.session.coupon?.discount

      if(findCart.products.length>0){
        res.render('user/checkout', { findCart, user,couponCode,couponDiscount })
      }else{
        res.render("user/shoping-cart")
      }

    } catch (error) {
   
    }
  }
}