const User = require ("../models/user");
const Service = require ("../models/service")

export const myProfile = (req,res,next) =>{
           User.findById(req.user._id, (err,user)=>{
               if(err){
                    return res.status(400).render("error", {errMessage: err.message})
               }
               else{
                   Service.find({createdBy:user._id}, (err,services)=>{
                       if(!err){
                        return res.status(200).render("dashboard", {user:user, services:services})

                       }
                   })

               }
        })
    }
