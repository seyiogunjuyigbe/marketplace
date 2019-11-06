const User = require ("../models/user");
export const newUser = (req,res)=>{
    User.create(req.body.user, (err,user)=>{
if(err){
    return res.status(500).send("internal Server Error")
} else{
    return res.status(200).send(user)
}
})

}