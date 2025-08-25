import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill in a valid email address'],
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is required'],
        unique: true,
        trim: true 
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    referralCode: {
        type: String,
    },
    sex: {
        type: String
    },
    bankName: {
        type: String
    },
    accountNumber: {
        type: String
    },
    residentialAddress: {
        type: String
    },
    nextOfKin: {
        name: String,
        phone: String,
        address: String
    },
    walletBalance: {
        type: Number,
        default: 0
    },
    totalContributed: {
        type: Number,
        default: 0
    },
    registrationFeeUrl: {
        type: String
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    activatedAt: {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.model('User', userSchema);

export default User;