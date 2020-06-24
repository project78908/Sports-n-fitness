var express=require('express');
var router=express.Router();
var mkdirp=require('mkdirp');
var path=require('path')
var multer=require('multer')
var multipart = require('connect-multiparty');
var fs=require('fs-extra')
var auth=require('../config/auth.js');
var isAdmin=auth.isAdmin;
//GET product model
var Product=require("../models/product.js")

//image path
/*var uploadPath=path.join('images',Product.imageBasePath)*/

//multer and upload
/*const upload= multer({
    dest: uploadPath,
fileFilter:(req,file,callback)=>{
    callback(null,)
}
})
var imageMimeTypes=['image/jpeg','image/png','image/jpg']*/

//get category model
var Category=require("../models/category.js");


//GET products index
router.get('/',isAdmin,function(req,res){
   
   Product.find(function(err,products){
       res.render('products.ejs',{
products:products,
       })
   })
});
//GET add products 
router.get('/add-product',isAdmin,async function(req,res){
var title="";
var desc="";
var price="";

Category.find(function(err,categories){

res.render('add_product.ejs',{

    title:title,
    desc:desc,
    categories:categories,
    price:price
});
});
});
//POST add products 
router.post('/add-product',function(req, res){
    if (!(req.files && req.files.image))
    { imageFile =""; }
        else{
        imageFile =  req.files.image.name ;
        }    
    req.checkBody('title', 'title must have a value').notEmpty(),
    req.checkBody('desc', 'Description must have a value').notEmpty(),
    req.checkBody('price', 'Price must have a value').notEmpty();
    req.checkBody('image',"Image!!!").isImage(imageFile)
    var title = req.body.title;
    var price = req.body.price;
    var desc = req.body.desc;
    var category = req.body.category;
    const errors = req.validationErrors();
    if (errors) {
        Category.find(function(err,categories){
            res.render('add_product.ejs', {
            errors: errors,
            title: title,
            desc: desc,
            price: price,
            categories: categories
        });
      })
   }
   else{   
    Product.findOne({title: title},function(err,product){
   if(product){
       req.flash('danger', 'Product exists, choose another name');
       res.locals.messages = req.flash();
      
       Category.find(function(err,categories){
           res.render('add_product.ejs', {
               title: title,
               desc: desc,
               price: price,
               categories: categories
           });
         });
      }
      else{
        var product = new Product({
         title: title,
         desc: desc,
         price: price,
         category: category, 
         image:imageFile
        });
        product.save((err)=>{
            if(err)
           return console.log(err);
           mkdirp('images/products_images/'+product._id)
                  .then(()=>{ 
           
                   if(imageFile != ""){
                       var productImage = req.files.image;
                       var path = '../images/products_images/'+product._id+'/'+imageFile;
                       productImage.mv(path, (err)=>{
                       if(err) return console.log(err)
                       });
                       console.log(req.files.image)
   
                   }
                   req.flash('success', 'product added')
                   res.locals.messages = req.flash();
                   res.redirect('/products');
                   
                  })
   
     
               });
           }
   })
   
   }
})
 //GET delete products
router.get('/delete-product/:id',isAdmin,function(req,res){
   var id=req.params.id;
   var path='../images/products_images'+id;
   fs.remove(path,function(err){
       if(err){
           console.log(err);
       }else{
        Product.findByIdAndRemove(req.params.id,function(err){
            console.log(err);
       });
  
    
        req.flash('success','Product deleted');
        res.locals.messages = req.flash();

        res.redirect('/products');
    }
    })     
     
 
 });
 

//exports
module.exports=router;