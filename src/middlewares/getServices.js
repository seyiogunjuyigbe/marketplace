const Service = require("../models/service");

export const getAllServices =(req,res)=>{
Service.find({}, (err,allServices)=>{
    if(err){
        return res.status(500).send("Internal Server Error")
    } else{
        return res.status(200).render("allServices", {services:allServices})
    }
})
}

export const getThisService = (req,res)=>{
    Service.findById(req.params.id, (err,thisService)=>{
        if(err){
            return res.status(404).send("Error... Not found!")
        } else{
            return res.status(200).render("viewService", {service:thisService})
        }
    })
}