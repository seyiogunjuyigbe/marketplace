import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';

export const storage = cloudinaryStorage({
  cloudinary,
  folder: 'marketplace',
  allowedFormats: ['jpg', 'png', 'mp4', 'mp3', 'zip', 'pdf', 'doc', 'txt'],
});