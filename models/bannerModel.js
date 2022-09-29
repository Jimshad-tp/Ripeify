const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({

    title:{
        type:String,

    },
    image: {
        type:String,
        require : true
    },
    status : {
        type: Boolean,
        default:true
    }

})
module.exports = mongoose.model('Banner', bannerSchema)