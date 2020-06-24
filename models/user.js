var mongoose=require('mongoose')

//user schema
var UserSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true

},

password:{
    type:String,
    required:true

},
number:{
    type:Number,
    required:true

},
admin:{
    type:Number,

}

})

var User= module.exports = mongoose.model('User', UserSchema)
