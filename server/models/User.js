import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  bio: { type: String },
  avatar: { type: String }, // base64 or URL
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
