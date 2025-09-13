import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { MONGODB_URI } from "../config/env.js";
import User from "../models/user.model.js";


// Connect to Mongo
const MONGO_URI = MONGODB_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("Admin1234!", 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      phone: "08012345678",
      password: hashedPassword,
      role: "admin",
      isActivated: true,
      isVerified: true,
    });

    console.log("🎉 Admin created successfully:", admin);
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();