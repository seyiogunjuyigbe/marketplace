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

export const seeMyServices = (req,res)=>{
    User.findById(req.user._id).populate("services").exec((err, user)=>{
        if(err){
            return res.status(404).send("User not found")
        } else{
            return res.status(200).render("myServices", {user:user})
        }
    })
}

export const editService = (req,res)=>{
    Service.findById(req.params.id, (err,service)=>{
        if(req.user._id !== service.createdBy){
            return res.status(401).send("You are not permitted to do that!")
        } else if(err){
            return res.status(404).send("Service not found")
        } else{
            return res.status(200).render("editService", {service:service})
        }
    })
}

