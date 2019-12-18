import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import { cloudinaryConfig } from '../config/cloudinary';

export const avatarStorage = cloudinaryStorage({
  cloudinary,
  folder: 'marketplace/avatar',
  allowedFormats: ['jpg', 'png'],
});

export const requirementStorage = cloudinaryStorage({
  cloudinary,
  folder: 'marketplace/requirements',
  
})