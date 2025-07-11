import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { 
    PORT, NODE_ENV, 
    MONGODB_URI, 
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_KEY, ARCJET_ENV,
    CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
} = process.env;

