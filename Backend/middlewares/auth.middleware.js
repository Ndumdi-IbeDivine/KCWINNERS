import { JWT_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({ message: 'Unauthorized'});

        const decoded = jwt.verify(token, JWT_SECRET);

        console.log(decoded)

        const user = await User.findById(decoded.userId).select("-password");

        // remove password from user obj
        user.password = undefined


        if(!user) return res.status(401).json({ message: 'Unauthorized'});

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message
        })
    }   
} 

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
    }
}

export { authorize, adminOnly };