import { STRIPE_PUBLISH_KEY } from "../config/constants";

const Service = require("../models/service");

export const getAllServices =(req,res)=>{
Service.find({}, (err,allServices)=>{
    if(err){
        return res.status(404).render("error",{errorMessage: "No services found"})
    } else{
        return res.status(200).render("allServices", {services:allServices})
    }
})
}

export const getThisService = (req,res)=>{
    Service.findById(req.params.service_id, (err,thisService)=>{
        if(err){
            console.log(err)
        return res.status(404).render("error",{errorMessage:"Error... Not found!"})

        } else{
            return res.status(200).render("viewService", {service:thisService, STRIPE_PUBLISH_KEY:STRIPE_PUBLISH_KEY})
        }
    })
}

export const getByCategory = (req,res)=>{
    Service.find({category: req.params.category}, (err,services)=>{
        if(!err){
            return res.status(200).render("category", {services:services})
        } else{
            return res.status(404).render("error")
        }
    })
}