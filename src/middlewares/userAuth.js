const User = require ("../models/user");
const passport = require("passport");


// Sign Up
export const registerUser = (req,res)=>{
let thisUser = new User(req.body.user);
thisUser.username = req.body.username;
User.register(thisUser, req.body.password, function(err,user){
    if(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
        passport.authenticate("local")(req, res, function(){
            console.log(user);
            return res.status(200).send("Successfully registered")
           })

})
}

//Login
export const loginUser = (req,res)=>{
    passport.authenticate("local", {
        successRedirect:'/user/dashboard',
        failureRedirect: "/user/login"
    }), ()=>{
    console.log("Logged In!")
    }
}

//logout Middleware
export const logoutUser = (req,res)=>{
    req.logout();
    res.redirect("/user/login")
}


// Check if user is logged in
export const isLoggedIn = (req,res,next)=>{
            if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/user/login");
        }
        
