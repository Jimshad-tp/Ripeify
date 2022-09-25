const userModel = require("../models/userModel")

module.exports = {
    checkout : async (req,res,next) => {
        try {
            console.log(req.body,'checkout in..........');
            const userId = req.user.id
          const checkout = new userModel({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            house : req.body.house,
            address : req.body.address,
            city : req,body, city,
            pincode : req.body.pincode,
            phone : req.body.phone
          })
          await checkout.save()
          console.log("address saved in database")
          res.redirect ('/getcart')
        } catch (error) {
            console.log(error)
          
        }
      }
}