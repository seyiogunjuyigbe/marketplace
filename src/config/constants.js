import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT, DB_URL, DOMAIN_NAME, SECRET_KEY, STRIPE_PUBLISH_KEY, STRIPE_SECRET_KEY 
} = process.env;
