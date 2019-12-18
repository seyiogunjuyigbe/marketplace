/* eslint-disable max-len */
import multer from 'multer';
import { avatarStorage } from '../helpers/cloudinaryStorage';
const User = require('../models/user');
const Service = require('../models/service')
export const multerUploads = multer({ avatarStorage }).array('media', 10);

export const uploadPage = (req,res)=>{
    res.render("upload")
}

var upload = multer({ storage: avatarStorage })
export const avatarUpload = upload.single('avatar')

export const afterUpload = (req,res)=>{
  User.findById(req.user._id, (err,user)=>{
    if(!err){
      user.avatarUrl = req.file.url;
      user.save();
      return res.status(200).redirect('/profile/dashboard')
    }
    else{
     return res.status(500).render('error', {errorMessage: err.message})
    }
  })
  
}

// export const