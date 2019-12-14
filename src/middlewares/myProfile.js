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
 export const createProfilePage = (req,res)=>{
    User.findById(req.user._id, (err,user)=>{   
        if(err){
            return res.status(404).render("error", {errorMessage: "User not found!"})
        } else{
            return res.status(200).render("createProfile", {user:user})
        }

})
 }

 export const createProfile = (req,res)=>{
     User.findById(req.user._id, (err,user)=>{
         if(err){
            return res.status(404).render("error", {errorMessage: "User not found!"})
         } else{
             const description = req.body.description;
             user.seller_profile.description = description;
             user.save();
             console.log(user.seller_profile)
             return res.redirect("/profile/skills/new")
         }
     })
 }

 export const updateProfile = (req,res)=>{
    User.findByIdAndUpdate(req.user._id, {seller_profile:{description:req.body.description}}, (err,user)=>{
        if(err){
            return res.status(500).send("Internal Service Error")
        } else{
            user.save();
            console.log(user.seller_profile)
            return res.status(200).redirect("/profile/dashboard")
        }
    })
 }