var express=require('express');
var router=express.Router();
var auth=require('../config/auth.js');
var isUser=auth.isUser;
//GET product model
var Product=require("../models/product.js")

//get category model
var Category=require("../models/category.js")


//get/
router.get('/',function(req,res){
    var loggedIn=(req.isAuthenticated())? true:false;
    Product.find(function(err,products){
        if(err)
        console.log(err);
       
       
            res.render('all_products.ejs',{
                products:products,
                loggedIn:loggedIn
            })
        
    })
    
});

//get by category/
router.get('/:category',isUser,function(req,res){
    var categorySlug=req.params.category;
    var loggedIn=(req.isAuthenticated())? true:false;

    Category.findOne({slug:categorySlug},function(err,c){
        Product.find({category:categorySlug},function(err,products){
            if(err)
            console.log(err);
           
           
                res.render('cat_products.ejs',{
                    products:products,
                    loggedIn:loggedIn

                })
            
        })
    })
    
    
});



//Exports
module.exports=router;