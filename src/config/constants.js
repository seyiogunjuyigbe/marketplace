import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT, DB_URL, DOMAIN_NAME, SECRET_KEY, PAYPAL_MODE, PAYPAL_SECRET, PAYPAL_CLIENT_ID
} = process.env;
