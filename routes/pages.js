var express=require('express');
var router=express.Router();
var auth=require('../config/auth.js');
var isUser=auth.isUser;
//GET page model
var Page=require("../models/page.js")


//get/
router.get('/',isUser,function(req,res){
    Page.findOne({slug:'main'},function(err,page){
        if(err)
        console.log(err);
       
       
            res.render('main.ejs')
        
    })
    
});
//get
router.get('/main',isUser,function(req,res){
    Page.findOne({slug:'main'},function(err,page){
        if(err)
        console.log(err);
       
       
            res.render('main.ejs')
        
    })
    
});
//get/
router.get('/sports',isUser,function(req,res){
    Page.findOne({slug:'sports'},function(err,page){
        if(err)
        console.log(err);
       
      
            res.render('sports.ejs')
        
    })
    
});
//get/
router.get('/prod',isUser,function(req,res){
    Page.findOne({slug:'prod'},function(err,page){
        if(err)
        console.log(err);
       
      
            res.render('prod.ejs')
        
    })
    
});
//get/
router.get('/fitness',isUser,function(req,res){
    Page.findOne({slug:'fitness'},function(err,page){
        if(err)
        console.log(err);
       
      
            res.render('fitness.ejs')
        
    })
    
});


//Exports
module.exports=router;