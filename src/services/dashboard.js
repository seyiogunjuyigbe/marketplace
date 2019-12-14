const Service = require ("../models/service");
const User = require("../models/user")

export const getMyPurchases = (req,res)=>{
    User.findById(req.user._id, (err,user)=>{
        if(!err){
            return res.status(200).render("myPurchases", {user:user})
        }
    })
}

export const getMyOrders = (req,res)=>{
    User.findById(req.user._id, (err,user)=>{
        if(!err){
            return res.status(200).render("myOrders", {user:user})
        }
    })
}

export const getMyInbox= (req,res)=>{
    User.findById(req.user._id, (err,user)=>{
        if(!err){
            return res.status(200).render("myInbox", {user:user})
        }
    })
}