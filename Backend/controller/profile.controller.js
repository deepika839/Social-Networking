const User = require('../models/profile.model');
 
 
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, state, city, gender, profession } = req.body;
    const profilePicture = req.file ? req.file.filename : null;
 
    const newUser = new User({
      name,
      email,
      state,
      city,
      gender,
      profession,
      profilePicture
    });
 
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
 
// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = await User.findById(req.params.id);
    console.log(userId)
    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(userId);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAll = async(req,res)=>{
  try {
    const userId = await User.find({}, "name profilePicture"); // Fetch only name & profilePicture
    res.json(userId);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Server error" });
  }
};
 
// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, state, city, gender, profession } = req.body;
    const profilePicture = req.file ? req.file.filename : null;
 
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, state, city, gender, profession, profilePicture },
      { new: true }
    );
 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
 
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};   
 