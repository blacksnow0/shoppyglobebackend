// User model with the name email and password

import mongoose from "mongoose";

const userModel = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export default mongoose.model("User", userModel);
