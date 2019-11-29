import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT, DB_URL, DOMAIN_NAME, 
  SECRET_KEY, STRIPE_PUBLISH_KEY, STRIPE_SECRET_KEY, 
  GOOGLE_CLIENT_ID,  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
} = process.env;
