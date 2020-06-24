const localStrategy=require('passport-local').Strategy 
const bcrypt = require('bcrypt')

function initialize(passport,getUserByEmail,getUserById){
    const authenticateUser= async (email,password,done)=>{
        const user=getUserByEmail(email)
        if(user == null)
        {
            return done(null,false,req.flash('danger', 'Username exists, choose another name'),
            res.locals.messages = req.flash())
        }
        try{
            if(await bcrypt.compare(password,user.password)){
return done(null,user)
            }
            else{
                return done(null,false,{ message: 'PASSWORD INCORRECT'})
            }
        }

catch(e){
    return done(e)
}
    }
passport.use(new localStrategy({usernameField:'email'}, authenticateUser))
passport.serializeUser((user,done) => done(null,user.id))
passport.deserializeUser((user,done) =>{

return done(null,getUserById)


})
}
module.exports = initialize
