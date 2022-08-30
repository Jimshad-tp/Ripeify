const { isObjectIdOrHexString } = require("mongoose")
const { updateOne } = require("../models/userModel")
const ObjectId = require('mongodb').ObjectId;
const userModel = require('../models/userModel')

const categoryModel =require('../models/categoryModel');
const { off } = require("../app");

module.exports = {
  adminlogin: (req, res, next) => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.render("error")
    }
  },
  adminlogout: (req, res, next) => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.render('error')
    }
  },

  getuserdata: (req, res, next) => {
    if (req.user?.isAdmin) {
      next()
    }else {
  
      res.redirect('/getuserdata')

    }
  },
 

  blockUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(
        req.params.id,
        { isActive: false })
      console.log('userblocked');
      res.redirect('/admin/getuserdata')


    } catch (err) {
      console.log(err);
      res.redirect('/admin/getuserdata')

    }
  },
  activeUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(
        req.params.id,
        { isActive: true })
      console.log('user activated');
      res.redirect('/admin/getuserdata')
    } catch {
      console.log(err);
      res.redirect('/admin/getuserdata')
    }
  },
  getcategory:(req,res,next) =>{
    if(req.user?.isAdmin){
      next()
    }else{                                     
      console.error();
      res.redirect("/")
    }
  },

  addcategory:async (req,res,next) =>{
  try{
    const category = new categoryModel({
      categoryName: req.body.categoryName
    })
    await category.save()
    console.log( { messages: req.flash('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii') });
   
    res.redirect('/admin/getcategory')
  }catch(err){
    console.log(err);
    res.redirect('/admin/getcategory')

  }
    
  },
  editCategory:async (req,res,next) =>{
      try{
        await categories.updateOne(
          req.params.id)
          res.redirect('/admin/getcategory')
        


      }catch(err){
        console.log(err);
        redirect('/admin/getcategory')
      }

    
   
  }

}