const Service = require("../models/service");

export const renderLandingPage =(req,res)=>{
Service.find({}, (err,allServices)=>{
    if(err){
        return res.status(500).send("Internal Server Error")
    } else{
        return res.status(200).render("index", {services:allServices})
    }
})
}