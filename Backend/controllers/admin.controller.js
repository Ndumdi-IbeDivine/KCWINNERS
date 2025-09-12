import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import User from '../models/user.model.js';
import ContributionAccount from '../models/contribution.model.js'
import Transaction from '../models/transaction.model.js'




const adminLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone number and password are required" });
    }

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  };
}
  

const getPendingRegistrations = async (req, res, next) => {
    try {
        const users = await User.find({ isVerified: false })
        .select('-password -resetPasswordToken -resetPasswordExpires')
        .sort({ createdAt: 1 });

        res.json({ success: true, count: users.length, users });
    } catch (error) { 
        next(error); 
    };
}

const approveRegistration = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        user.isVerified = true;
        user.registrationApprovedAt = new Date();
        await user.save();

        res.json({ success: true, message: 'User registration approved', user });
    } catch (error) { 
        next(error); 
    };
}

const getClearedUsers = async (req, res, next) => {
  try {
    // Step 1: Find all users who have paid clearance fee
    const clearanceTx = await Transaction.find({ 
      type: "clearance_fee", 
      status: "success" 
    }).select("userId");

    const clearedUserIds = clearanceTx.map(tx => tx.userId.toString());

    // Step 2: From those, filter users who cleared defaults
    const accounts = await ContributionAccount.find({
      userId: { $in: clearedUserIds },
      clearedDefaults: true,
    }).populate("userId", "fullName phone email"); // bring user info

    res.status(200).json({
      success: true,
      message: "Users who cleared defaults and paid clearance fee",
      data: accounts.map(acc => ({
        user: acc.userId,
        accountId: acc._id,
        missedWeeks: acc.missedWeeks,
        clearedDefaults: acc.clearedDefaults,
      }))
    });
  } catch (err) {
    next(err);
  }
};


export {
    adminLogin,
    getPendingRegistrations,
    approveRegistration,
    getClearedUsers
}