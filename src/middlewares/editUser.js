const User = require ("../models/user");
export const editUser = (req,res)=>{
    const {params} = req;
    User.findByIdAndUpdate(params.id, req.body.user, (err,user)=>{
        if(err){
           return res.status(404).render("error", {errorMessage:"User not found"})
        } else{
               return res.status(200).redirect("/profile/dashboard")
        }
    })

}