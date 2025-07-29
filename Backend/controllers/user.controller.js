import User from '../models/user.model.js';

// For admin to get users, TO do: add paginatiion
// TO DO: get unverified users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error);
    }
}

//To also get user profile
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password')

        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error);
    }
}

// const updateProfile

// const ChangePassword

export {
    getUsers,
    getUser
}