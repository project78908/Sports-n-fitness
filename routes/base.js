/*routes folder simply means controller*/
const express=require("express");
const router = express.Router()
const flash=require('express-flash')

/*const expressLayouts=require('express-ejs-layouts')
const expressHandlebars=require('express-handlebars')*/

const session=require('express-session')

const passport=require('passport')

const bodyParser=require("body-parser");

const bcrypt=require('bcrypt')

const methodOverride=require('method-override')

const initializePassport=require('../passport-config')
initializePassport(
    passport,
    email=> users.find(user=> user.email ===email),
    id=> users.find(user=> user.id ===id)

)
const Account=require('../models/account')

const users=[];

router.use(flash())
router.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
/*router.use(expressLayouts)
router.use(expressHandlebars)*/
router.use(bodyParser.urlencoded({extended:false}));

router.use(passport.initialize())
router.use(passport.session())

router.use(methodOverride('_method'))



router.get('/',(req,res)=>{
    res.render('signinform.ejs',{account:new Account()});
})


router.get("/home",checkAuthenticated,function(req,res) 
{

res.render('main.ejs');
});

router.get("/signinform",checkNotAuthenticated,function(req,res)
 {

    res.render('signinform.ejs',{account:new Account()});
});
router.get("/signupform",checkNotAuthenticated,function(req,res)
 {

    res.render('signupform.ejs',{account:new Account()});
});


router.post("/signinform",checkNotAuthenticated,passport.authenticate('local',{
successRedirect:'/home',
failureRedirect:'/signinform',
failureFlash:true
}));

router.post("/signupform",checkNotAuthenticated,async(req,res)=>{
    const user= new User({
        id:Date.now().toString(),
              name:name,
              email:email,
              password:password,
              number:number,
              admin:1  
    
 })
     try{ const newUser=await user.save();

const hashedPassword=await bcrypt.hash(req.body.password,10)
users.push({  
    id:Date.now().toString(),
    name:req.body.name,
    email:req.body.email,
    number:req.body.number,
    password:hashedPassword
})
res.redirect('/signinform')
     }catch{ res.redirect('/signupform')
    }
    console.log(users)
})





function checkAuthenticated(req,res,next){

    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/signinform')
}
function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    next()
}


module.exports=router