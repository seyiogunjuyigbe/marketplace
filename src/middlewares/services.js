const Service = require ("../models/service");
const User = require("../models/user")
export const renderServicePage = (req,res)=>{
    User.findById(req.user.id, (err,user)=>{
        if(err){
            return res.status(404).send("User not found")
        } else{

           return res.status(201).render("createService", {user:user})
        }
    })
}


export const createService = (req,res)=>{
    User.findById(req.params.id, (err,user)=>{
        if(err){res.status(404).send("User not found!")}
        else{
    Service.create(req.body.service, (err,service)=>{
    if(err){
        return res.status(500).send("internal Server Error")
    } else{
        service.createdAt = Date.now();
        service.createdBy = user._id;
        service.save();
        user.services.push(service);
        user.save()
        return res.status(200).send(service)
    }
    })
}
    })


}

export const seeAllServices = (req,res)=>{
    User.findById(req.user._id).populate("services").exec((err, user)=>{
        if(err){
            return res.status(404).send("User not found")
        } else{
            return res.status(200).render("allServices", {user:user})
        }
    })
}