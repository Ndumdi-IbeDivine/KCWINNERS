import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { MONGODB_URI } from "../config/env.js";

dotenv.config();

const checkAdmins = async () => {
  await mongoose.connect(MONGODB_URI);
  const admins = await User.find({ role: "admin" });
  console.log("Found admins:", admins);
  process.exit();
};

checkAdmins();