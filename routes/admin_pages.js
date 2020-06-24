var express=require('express');
var router=express.Router();
var auth=require('../config/auth.js');
var isAdmin=auth.isAdmin;
//GET page model
var Page=require("../models/page.js")


//GET pages index
router.get('/',isAdmin,function(req,res){
    Page.find(function(err,pages){
if(err) return console.log(err);
        res.render('pages.ejs',{ 
            pages:pages
        });
      
});
});
//GET add pages 
router.get('/add-page',isAdmin,function(req,res){
var title="";
var slug="";
var content="";

res.render('add_page.ejs',{

    title:title,
    slug:slug,
    content:content
});
});
//POST add pages 
router.post('/add-page',function(req,res){
   req.checkBody('title','Title must have a value').notEmpty(); 
   req.checkBody('slug','Slug must have a value').notEmpty(); 

   req.checkBody('content','Content must have a value').notEmpty(); 

var title=req.body.title;
var slug=req.body.slug;
var content=req.body.content;
var errors=req.validationErrors();

if(errors){    
    res.render('add_page.ejs',{

    errors:errors,
    title:title,
    slug:slug,
    content:content
});
}else{
    Page.findOne({title:title},function(err,page){
if(page){
    req.flash('danger','Page already exists');
    res.locals.messages = req.flash();

    res.render('add_page.ejs',{
        msg: req.flash('danger'),

        title:title,
        slug:slug,
        content:content});
       
        
}else{
    var page=new Page({
        title:title,
        slug:slug,
        content:content
    }); 
   
    page.save(function(err){
        if(err) return console.log(err);
        Page.find(function(err,pages){
            if(err) return console.log(err);
                   req.app.locals.pages=pages;
                  
            });
        req.flash('success','Page added!');
        res.locals.messages = req.flash();

        res.redirect('/pages');
    }) ; 
   
}
    });
}
    });
 
//GET delete pages index
router.get('/delete-page/:id',isAdmin,function(req,res){
   
    Page.findByIdAndRemove(req.params.id,function(err){
        if(err) return console.log(err);
        Page.find(function(err,pages){
            if(err) return console.log(err);
                   req.app.locals.pages=pages;
                  
            });
        req.flash('success','Page deleted!');
        res.locals.messages = req.flash();

        res.redirect('/pages');
    })     
     
 
 });
 

//exports
module.exports=router;