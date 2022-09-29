const { isObjectIdOrHexString } = require("mongoose")
const { updateOne } = require("../models/userModel")
const ObjectId = require('mongodb').ObjectId;
const userModel = require('../models/userModel')
const productModel = require('../models/ProductModel')
const categoryModel = require('../models/categoryModel');
const bannerModel = require('../models/bannerModel');
const { off } = require("../app");


module.exports = {
  adminLogin: (req, res, next) => {
    try {
      if (req.user?.isAdmin) {
        res.render('admin/admin-home');
      }
    } catch (error) {
      console.log(error);
      res.render("error")
    }
  },
  adminLogout: (req, res, next) => {
    try {
      if (req.user?.isAdmin) {
        console.log('admin logout');
        res.redirect('/')
      }
    } catch (error) {
      res.render('error')
    }
  },
  getUserdata: async (req, res,) => {
    try {
      if (req.user?.isAdmin) {
        const users = await userModel.find({})
        res.render('admin/user-manage',
          {
            users: users,
            layout: 'layout/usermanage-layout'
          });
      }
    } catch (err) {
      console.log(err)
      res.render('error')
    }
  },
  blockUser: async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(
        req.params.id,
        { isActive: false })
      res.redirect('/admin/getuserdata')
    } catch (err) {
      console.log(err);
      res.redirect('/admin/getuserdata')
    }
  },
  activeUser: async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(
        req.params.id,
        { isActive: true })
      res.redirect('/admin/getuserdata')
    } catch {
      console.log(err);
      res.redirect('/admin/getuserdata')
    }
  },
  getCategory: async (req, res, next) => {
    try {
      if (req.user?.isAdmin) {
        const categories = await categoryModel.find().sort(
          { categoryName: 1 })
        const errorMessage = req.flash("message")
        res.render('admin/category-manage', {
          categories: categories,
          errorMessage: errorMessage,
          layout: 'layout/usermanage-layout'
        })
      }
    } catch (error) {
      console.log(error);
      res.redirect("/")
    }
  },

  addCategory: async (req, res, next) => {
    try {
      const category = new categoryModel({
        categoryName: req.body.categoryName
      })
      await category.save()
      res.redirect('/admin/getcategory')
    } catch (err) {
      console.log(err);
      res.redirect('/admin/getcategory')

    }
  },
  editCategory: async (req, res) => {
    try {

      await Category.findByIdAndUpdate(
        req.params.id,
        { categoryName: req.body.categoryName })
      res.redirect('/admin/getcategory')
    } catch (err) {
      console.log(err);
      res.redirect('/admin/getcategory')
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await categoryModel.findByIdAndDelete(
        req.params.id).exec()
      req.flash("message", "Category deleted")
      res.redirect('/admin/getcategory')
    } catch (err) {
      console.log(err);
      res.redirect('/admin/getcategory')
    }

  },
  getProduct: async (req, res, next) => {
    try {
      if (req.user?.isAdmin) {
        const category = await categoryModel.find()
        const product = await productModel.find().populate("category").exec()

        res.render('admin/product',
          {
            product: product,category:category,
            layout: 'layout/usermanage-layout'
          })
      }
    } catch (error) {
      console.log(error);
      res.render('error')
    }
  },
  addProduct: async (req, res, next) => {
    try {
      const price = parseFloat(req.body.price)
      const discount = req.body.discount ? parseFloat(req.body.discount) : null
      const offerPrice = req.body.discount ? price - (((price / 100) * discount).toFixed(2)) : null;
      req.files.forEach(img => {  })
      const productImages = req.files != null ? req.files.map((img) => img.filename) : null
      console.log(productImages)
      const product = new productModel({
        productName: req.body.productName,
        quantity:req.body.quantity,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
        discount: discount,
        offerPrice: offerPrice,
        discription: req.body.discription,
        images:productImages

        // product = await Product.findById(req.params.id)
        // await Product.findByIdAndUpdate(req.params.id, {
      
      })
      await product.save()
      res.redirect('/admin/product')
    } catch (err) {
      console.log(err);
      res.redirect('/admin/product')
    }
  },
  editproduct: async (req, res) => {
    try {
      await productModel.findByIdAndUpdate(req.params.id, {
        productName: req.body.productName,
        quantity:req.body.quantity,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
        discription: req.body.discription,
        images: req.body.productImages
      })
      res.redirect('/admin/product')
    } catch (error) {
      console.log(error);
      res.redirect('/admin/product')
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.id)
      res.redirect('/admin/product')
    } catch (error) {
      console.log(error);
      res.redirect('/admin/product')

    }
  },
  banner : async (req,res) => {
    try{
      if (req.user?.isAdmin) {

        const findBanner = await bannerModel.find()
    
        res.render('admin/banner-manage',{findBanner, layout: 'layout/usermanage-layout'});
      }


    }catch(err){
console.log(err);
    }
  },
  addBanner : async (req,res) => {
    try {
      console.log("files: "+req.files)
      console.log("file: "+req.file)
   
      console.log(req.body);
      if(req.user.isAdmin){
        const image =   req.file != null ? req.file.filename : null     
        console.log(image);
      const banner = new bannerModel({
        title : req.body.title,
        image :image
       
      })
      await banner.save()
      console.log(banner);
      }
      res.redirect('back')
    } catch (error) {
      console.log(error);
    }
  }
}