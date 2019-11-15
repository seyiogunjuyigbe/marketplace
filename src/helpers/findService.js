const Service = require("../models/service");

export const findService= (req,res)=>{
    Service.find({title: req.query}, (err,found)=>{
        if(!err){
            return res.status(200).render("index", {services:found})
        } else{
            return res.status(404).render("error", {errorMessage: "Search item not found"})
        }
    })
}