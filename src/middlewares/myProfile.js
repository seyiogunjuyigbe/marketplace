const User = require ("../models/user");


export const myProfile = (req,res,next) =>{
           User.findById(req.user._id, (err,user)=>{
               if(err){
                    return res.status(400).render("error", {errMessage: err.message})
               }
               else{
                return res.status(200).render("dashboard", {user:user})

               }
        })
    }
