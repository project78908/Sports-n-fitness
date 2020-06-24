var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var session=require('express-session')
var auth=require('../config/auth.js');
var isAdmin=auth.isAdmin;
//GET category model
var Category=require("../models/category.js")


//GET category index
router.get('/',isAdmin,function(req,res){
    Category.find(function(err,categories){
if(err) return console.log(err);
        res.render('categories.ejs',{
categories:categories
        });
      
});
});
//GET add category 
router.get('/add-category',isAdmin,function(req,res){
var title="";


res.render('add_category.ejs',{
    title:title,
    
});
});
//POST add category
router.post('/add-category',function(req,res){
   req.checkBody('title','Title must have a value').notEmpty(); 

var title=req.body.title;

var errors=req.validationErrors();

if(errors){    
    res.render('add_category.ejs',{
    errors:errors,
    title:title,
    
});
}else{
    Category.findOne({title:title},function(err,category){
if(category){
    req.flash('danger','Category exists,choose another one');
    res.locals.messages = req.flash();

    res.render('add_category.ejs',{
        title:title,
        });
}else{
    var category=new Category({
        title:title,
        
    }); 
   
    category.save(function(err){
        if(err) return console.log(err);
        Category.find(function(err,categories){
            if(err) return console.log(err);
            req.app.locals.categories=categories;
                  
            });
        req.flash('success','Category added!');
        res.locals.messages = req.flash();

        res.redirect('/categories');
    }) ; 
   
}
    });
}
    });

//GET delete pages index
router.get('/delete-category/:id',isAdmin,function(req,res){
   
    Category.findByIdAndRemove(req.params.id,function(err){
        if(err)return console.log(err);
        Category.find(function(err,categories){
            if(err) return console.log(err);
                   req.app.locals.categories=categories;
                  
            });
        req.flash('success','Category deleted!');
        res.redirect('/categories');
    })     
     
 
 });
 

//exports
module.exports=router;