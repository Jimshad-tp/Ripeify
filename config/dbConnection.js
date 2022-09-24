const mongoose = require("mongoose");

module.exports = {
    mongoose : async (req,res,next) => {
        const mongoURI = "mongodb://localhost:27017/ripeify";
mongoose
  .connect(mongoURI)
  .then((res) => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("not connected");
  });
    }
}