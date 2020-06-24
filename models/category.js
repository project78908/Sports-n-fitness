var mongoose=require('mongoose')

//category schema
var CategorySchema=new mongoose.Schema({
title:{
    type:String,
    required:true

},
slug:{
    type:String,
}

})

var Category=module.exports = mongoose.model('Category', CategorySchema)