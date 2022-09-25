const mongoose =require('mongoose')

const orderSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Type.ObjectId,
        ref:"User",
        required : true
    },
    deliveryAddress: {
        type:Object
    },
    products:[
        {
            productId : {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity :Number,
            name : String,
            price : Number,
            offerPrice : Number
        }
    ],
    quantity : {
        type :Number
    },
    total : {
        type:Number
    },
    subTotal :{
        type:Number
    },
    paymentType : {
        type : String,
        required:true
    },
    razorpayOrderId : {
        type:String,

    },
    razorpayPaymentId: {
        type :String
    },
    status : {
        type:String,
        default:"pending"
    }
},{timestamps:true})
module.exports = mongoose.model("Order",orderSchema)