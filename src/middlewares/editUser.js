const User = require ("../models/user");
export const editUser = (req,res)=>{
    const {params} = req;
    User.findByIdAndUpdate(params.id, req.body.user, (err,user)=>{
        if(err){
           return res.status(404).send("User not found")
        } else{
               return res.status(200).send("User has been edited")
        }
    })

}