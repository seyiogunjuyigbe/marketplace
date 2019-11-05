const Service = require ("../models/service");
const User = require("../models/user")
export const createService = (req,res)=>{
    User.findById(req.params.id, (err,user)=>{
        if(err){res.status(404).send("User not found!")}
        else{
    Service.create(req.body.service, (err,service)=>{
    if(err){
        return res.status(500).send("internal Server Error")
    } else{
        return res.status(200).send(service)
    }
    })
}
    })


}