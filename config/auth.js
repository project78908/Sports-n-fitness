exports.isUser=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash('danger', '');
            res.redirect('/users/signinform');
    }
}
exports.isAdmin=function(req,res,next){
 if(req.isAuthenticated()){
        next();
    }else{
        req.flash('danger', '');
            res.redirect('/users/signinform');
    }
}