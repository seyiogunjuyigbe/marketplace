const User = require("../models/user");
const Skill = require("../models/skill");
export const renderSkillPage = (req,res)=>{
    User.findById(req.user._id, (err,user)=>{
        if(err){
        return res.status(401).redirect("/login", {errorMessage: err.message})
        }
        else{
        return res.status(200).render("addskills", {errorMessage: err.message})
        }
    })
}
export const AddSkills = (req,res) =>{
User.findById(req.user._id, (err,user)=>{
    if(err){
        return res.status(401).redirect("/login", {errorMessage: err.message})
    } else{
        Skill.create(req.body.skill, (err,skill)=>{
            if(!err){
                user.skills.push(skill);
                skill.save();
                user.save();
                return res.redirect("back")
            } else{
              return  res.status(500).render("error", {errorMessage:err.message})
            }
        })
    }
})
}