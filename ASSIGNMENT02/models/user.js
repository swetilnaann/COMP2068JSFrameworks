// models/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // password is optional so Google/GitHub-only accounts can exist
  password: { type: String },
  googleId: String,
  githubId: String,
  avatar: String,
});

// Hash password before saving (only if it exists and is modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare entered password with hashed one
userSchema.methods.comparePassword = async function (entered) {
  if (!this.password) return false; // e.g., Google-only account
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);
