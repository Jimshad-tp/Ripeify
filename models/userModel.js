const { query } = require("express");
const mongoose = require("mongoose");
const passportLocalMongoos = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type:Boolean,
    required:true,
     default:false
    },
  isActive:{
    type:Boolean,
    required:true,
    default:true
  }
});

//password hash and salt 
UserSchema.plugin(passportLocalMongoos, {
  usernameField: "email",
  findByUsername:function (model,queryParameters){
    queryParameters.isActive = true;
    return model.findOne(queryParameters);
  }
});

module.exports = User = mongoose.model("User", UserSchema);
