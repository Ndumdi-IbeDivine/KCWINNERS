import express from 'express';
import User from '../models/user.model.js';
import ContributionAccount from '../models/contribution.model.js'
import Transaction from '../models/transaction.model.js'


const getPendingRegistrations = async (req, res, next) => {
    try {
        const users = await User.find({ isRegistered: false })
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

        user.isRegistered = true;
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
    getPendingRegistrations,
    approveRegistration,
    getClearedUsers
}