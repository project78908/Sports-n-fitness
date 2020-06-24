var mongoose=require('mongoose')

/*const imageBasePath='products_images'*/
var fs=require('fs');

//page schema
var ProductSchema=new mongoose.Schema({
title:{
    type:String,
    required:true
},
slug:{
    type:String,
},
desc:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true

},
image:{
    type:String,
},

})

var Product= module.exports = mongoose.model('Product',ProductSchema)
/*module.exports.imageBasePath=imageBasePath*/