const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary')
import {CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET, CLOUDINARY_URL} from "../config/constants"
export const cloudinaryConfig = cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

