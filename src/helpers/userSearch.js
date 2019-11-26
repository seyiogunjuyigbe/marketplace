const User = require("../models/user");

export const findLoggedUser = (req,res,next)=>{
    User.findById(req.user._id, (err,user)=>{
        if(err || user == null){
            res.status(404).render("error", {errMessage: "Sorry, we couldn't find your profile"})
        } else{
            return user;
        }
    })
}