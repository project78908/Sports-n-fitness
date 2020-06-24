/*this file spins up the express application which will make handling requests a bit easier for us*/
/*express application qualifies as a request handler so with that we have a setup that should actually work  */

if(process.env.NODE_ENV !=='production'){
    require('dotenv').config({ path:'.env' })
}
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var express=require("express");
var path=require('path')
var bodyParser=require("body-parser");
var session=require('express-session')
var validationResult  = require('express-validator');
var config = require('./config/database.js')
var flash=require('connect-flash')
var cookieParser = require('cookie-parser');
var fileUpload=require('express-fileupload');
var multer=require('multer')
var bb = require('express-busboy');
var fs=require('fs-extra')
var passport=require('passport');
var cors=require('cors');
require('dotenv').config();

//Init app
var app=express();/*execute express as a function*/


/*const indexRouter=require('./routes/base.js')
const categoryRouter=require('./routes/categories.js')
const bcrypt=require('bcrypt')
const Account=require('./models/account')
const Category=require('./models/category')*/

/*database*/
var mongoose=require("mongoose");
var DB=config.database;
mongoose.connect(DB,{useNewUrlParser:true,useCreateIndex : true,useFindAndModify: false,useUnifiedTopology: true})  
var db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('connected to db '));

/*var multer=require('multer')
var storage=multer.diskStorage({
  destination:'images/products_images',
  filename:function(req,file,cb){
    cb(null,file.fieldname + '-'+ Date.now()+path.extname(file.originalname));
  }
})
const upload=multer({
  storage:storage
}); */

//View engine setup
app.set('view-engine','ejs')
app.set('views',path.join(__dirname+'/views'))

//Files setup
app.use("/css",express.static(__dirname+"/css"));
app.use("/javascript",express.static(__dirname+"/javascript"));
app.use("/images",express.static(__dirname+"/images"));


//set global errors variable
app.locals.errors=null;


// file upload middleware
app.use(fileUpload());

//parser json
app.use(bodyParser.json());
app.use(express.json());

//bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));

//Get page model
var Page=require('./models/page');

//Get all pages to pass to header1.js
Page.find(function(err,pages){
  if(err) return console.log(err);
         app.locals.pages=pages;
        
  });

  //Get category model
var Category=require('./models/category');

//Get all pages to pass to header1.js
Category.find(function(err,categories){
  if(err) return console.log(err);
         app.locals.categories=categories;
        
  });

//express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  }))

  
//express-busboy
bb.extend(app);
 
// cores
app.use(cors());

//express validator middleware
app.use(validationResult({
    errorFormatter:function(param,msg,value){
        var namespace=param.split('.')
        , root =namespace.shift()
        , formParam=root;

        while(namespace.length){
            formParam += '['+namespace.shift() + ']';
        }
        return{
            param:formParam,
            msg:msg,
            value:value
        };
    },
    customValidators:{
isImage:function(value,filename){
  var extension=(path.extname(filename)).toLowerCase();
  switch(extension){
    case '.jpg':
      return'.jpg';
    case '.png':
        return'.png';
    case '.jpeg':
          return'.jpeg';
     case '':
            return'.jpg';
            default:
              return false;
  }
}
    }
}));


// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });
  
//connect-flash 
app.use(flash());


// cookie
  app.use(cookieParser('secretString'));

//passport config
require ('./config/passport.js')(passport);

//passport  middleware
app.use(passport.initialize());
app.use(passport.session());

//
app.get('*',function(req,res,next){
  res.locals.cart=req.session.cart;
  res.locals.user=req.user || null;
  next();
})

//Set routes
var pages=require('./routes/pages.js');
app.use('/',pages);
var products=require('./routes/products.js')
app.use('/product-view',products);
var adminPages=require('./routes/admin_pages.js');
app.use('/pages',adminPages);
var adminCategories=require('./routes/admin_categories.js');
app.use('/categories',adminCategories);
var adminProducts=require('./routes/admin_products.js');
app.use('/products',adminProducts);
var cart=require('./routes/cart.js')
app.use('/cart',cart);
var user=require('./routes/users.js')
app.use('/users',user);

/*app.use('/',indexRouter)
app.use('/main',indexRouter)
app.use('/home',indexRouter)
app.use('/signinform',indexRouter)
app.use('/signupform',indexRouter)
app.use('/main',categoryRouter)
app.use('/home',categoryRouter)
app.use('/sports',categoryRouter)
app.use('/fitness',categoryRouter)
app.use('/products',categoryRouter)
app.use('/logout',categoryRouter)*/

//Exports
module.exports=app;