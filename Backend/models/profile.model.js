const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String },
  state: { type: String },
  gender: { type: String },
  profession: { type: String },
  profilePicture: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});



const User = mongoose.model('profiledetails', ProfileSchema);
module.exports = User;
 
 