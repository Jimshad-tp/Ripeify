const userModel = require("../models/userModel");
const productModel = require('../models/ProductModel')
const passport = require("passport");

module.exports = {
  userRegister: (req, res) => {
    if (req.body.password === req.body.password2) {
      userModel.register(
        {
          name: req.body.name,
          email: req.body.email,
        },
        req.body.password,
        (err, user) => {
          if (err) {
            console.log(err);
            req.flash("message", "User Already registered")
            res.redirect("/signup");
          } else {
            passport.authenticate("local")(req, res, () => {
             
              res.redirect("/");
            });
          }
        }
      );
    } else {
      console.log("password not match");
      res.redirect("/signup");
    }
  },

  userLogin: passport.authenticate("local", {
    failureRedirect: "/login",

  }),

  userLogout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log(err);
      } else {
    
        res.redirect("/");
      }
    });
  },


  checkLogout: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      next();
    }
  }
 
};
