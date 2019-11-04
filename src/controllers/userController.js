import User from "../models/user";
import { respondWithWarning } from '../helpers/responseHandler';

export const createUser = async(req,res) =>{
    try{
        const newUser = new User(req.body.user);
        newUser.save((err,newUser)=>{
            if(err){
        const result = respondWithWarning(res, 500, "Server error");
          return result;
            }
            console.log(newUser)
            return res.status(201).send(newUser)
            
        })
    }
    catch(err){
        console.log(err)
    }
}