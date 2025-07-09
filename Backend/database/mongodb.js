import mongoose from 'mongoose';
import { MONGODB_URI, NODE_ENV } from '../config/env.js';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI enviroment variable in .env.<development/production>.local')
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`Connected to Database in ${NODE_ENV} mode`);
        
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

export default connectToDatabase
