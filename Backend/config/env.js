import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { 
    PORT, NODE_ENV, 
    MONGODB_URI, 
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_KEY, ARCJET_ENV,
    CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
    TERMII_API_KEY, TERMII_TOKEN_URL, TERMII_VERIFY_URL,
    SQUAD_SECRET_KEY, SQUAD_INITIATE_URL, SQUAD_VERIFY_URL
} = process.env;

