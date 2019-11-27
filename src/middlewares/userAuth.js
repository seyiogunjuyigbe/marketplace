const User = require ("../models/user");
const passport = require("passport");


// Sign Up
export const registerUser = (req,res)=>{
let thisUser = new User(req.body.user);
thisUser.username = req.body.username;
thisUser.joinDate = Date.now();
User.register(thisUser, req.body.password, function(err,user){
    if(err){
        console.log(err);
        return res.status(500).render("register", {errMessage: err.message});
    }
        passport.authenticate("local")(req, res, function(){
            console.log("User registered");
            return res.redirect("/profile/dashboard")
           })

})
}


//Login
export const loginUser = 
    passport.authenticate("local", {
        successReturnToOrRedirect:'/profile/dashboard',
        failureRedirect: "/user/login"
    }) 



//logout Middleware
export const logoutUser = (req,res)=>{
    req.logout();
    console.log("Logged Out")
    res.redirect("/user/login");
}


// Check if user is logged in
export const isLoggedIn = (req,res,next)=>{
            if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/user/login");
        }
        
