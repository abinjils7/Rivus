const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "customer" },
  status: { type: Boolean, default: true },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
