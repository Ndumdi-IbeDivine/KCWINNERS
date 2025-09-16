import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import User from '../models/user.model.js';
import ContributionAccount from '../models/contribution.model.js'
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";



const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputy
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("📩 Admin login attempt:", email);

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log("❌ No user found with that email");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

     console.log("🔑 Generating JWT for admin:", user.email);

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
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
    // Get pagination params from query, set defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const total = await User.countDocuments({ isVerified: false });

    // Fetch users with pagination
    const users = await User.find({ isVerified: false })
      .select("name email phone registrationProofUrl createdAt isActivated")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      count: users.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const approveRegistration = async (req, res, next) => {
    try {
        const { userId } = req.query;

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


const getAllUsers = async (req, res, next) => {
  try {
    // Get pagination params from query, set defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total number of users
    const total = await User.countDocuments();

    // Fetch paginated users
    const users = await User.find()
      .select("-password -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 }) // newest users first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      users,
    });
  } catch (error) {
    next(error);
  }
}

const getClearedUsers = async (req, res, next) => {
  try {
    // Get pagination params from query, set defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const total = await ContributionAccount.countDocuments({ status: "eligible_for_withdrawal" });

    // Fetch accounts with pagination
    const clearedAccounts = await ContributionAccount.find({ status: "eligible_for_withdrawal" })
      .populate("userId", "name email phone accountNumber bankName")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: clearedAccounts.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: clearedAccounts,
    });
  } catch (error) {
    next(error);
  }
};

const markAccountAsPaid = async (req, res, next) => {
  try {
    const { userId, accountId } = req.body;
    
    if (!userId || !accountId) {
      return res.status(400).json({ message: "userId and accountId are required" });
    }

    // Find account
    const account = await ContributionAccount.findOne({
      _id: accountId,
      user: userId,
      status: "eligible_for_withdrawal", // only eligible accounts can be paid
    });

    if (!account) {
      return res.status(404).json({ message: "Eligible account not found" });
    }

    // Update status to paid
    account.status = "paid";
    await account.save();

    res.status(200).json({
      success: true,
      message: `Contribution account ${accountId} marked as paid.`,
      account,
    });
  } catch (error) {
    console.error("❌ Error marking account as paid:", error);
    next(error);
  }
};

export {
    adminLogin,
    getPendingRegistrations,
    approveRegistration,
    getAllUsers,
    getClearedUsers,
    markAccountAsPaid
}