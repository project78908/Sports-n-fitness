var express=require('express');
var router=express.Router();
var passport=require('passport');
var bcrypt=require('bcryptjs');

//GET page model
var User=require("../models/user.js")


//get register
router.get('/signupform',function(req,res){
   res.render('signupform.ejs')
    
});

//post register
router.post('/signupform',function(req,res){
var name=req.body.name;
var email=req.body.email;
var number=req.body.number;
var password=req.body.password;
var username=req.body.username;
var password2=req.body.password2;

req.checkBody('password2','Passwords do not match!!').equals(password);

var errors=req.validationErrors();

if(errors){
    res.render('signupform.ejs',{
        errors:errors,
        user:null,
        name:name,
        email:email,
        password:password,
        number:number,
        username:username
    })

}else{
    User.findOne({email:email },function(err,user){
        if(user){
            req.flash('danger', 'Email exists!!');
            res.locals.messages = req.flash();
            res.render('signupform.ejs',{
                errors:errors.errors,
        user:null,
        name:name,
        email:'',
        password:password,
        number:number,
        username:username 
            });
            
        }else{
            var user = new User({
              name:name,
              email:email,
              password:password,
              number:number,
              username:username,
              admin:0
            });
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(user.password,salt,function(err,hash){
                    if(err) console.log(err);

                    user.password=hash;
                    user.save(function(err){
                        if(err){
                            console.log(err);

                        }else{
                            req.flash('success', 'Registered');
            res.locals.messages = req.flash();
            res.redirect('/users/signinform');
                        }
                    })
                })
            })
        }
    })
}
 });

//get login
router.get('/signinform',function(req,res){
if(res.locals.user) res.redirect('/');
    res.render('signinform.ejs',{
    })
     
 });
 
 //post login
router.post('/signinform',function(req,res,next){
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/users/signinform',
failureFlash:true 
       
    })(req,res,next);
    
 });
 //get logout
router.get('/logout',function(req,res){
    req.logout();
    
    req.flash('success', 'You are logged out!');
    res.redirect('/users/signinform');
 
     });

//Exports
module.exports=router;