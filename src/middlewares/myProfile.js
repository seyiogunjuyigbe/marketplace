const User = require ("../models/user");
const passport = require("passport");
import isLoggedIn from "./userAuth";

export const myProfile = (req,res,next) =>{
    if(req.user == undefined){
        return res.redirect("/user/login")
    }
    else{
        User.findById(req.user._id, (err,user)=>{
                return res.status(200).render("dashboard", {user:user})
        })
    }
}
