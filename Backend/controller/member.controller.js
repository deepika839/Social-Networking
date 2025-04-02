const Member = require('../models/member');
 
exports.uploadProfilePicture = async(req,res)=>{
    const {username}=req.body;
 
    try{
        const user = await Member.findOne({username});
 
        if(!user) return res.status(404).json({message:"User not found"});
 
        user.profilePicture=req.file.path;
        await user.save();
 
        res.json({message:"Profile Picture updated",user})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"})
    }
}
// Get all members
exports.getAllMembers = async(req,res)=>{
    try {
      const profiles = await User.find({}, "name profilePicture"); // Fetch only name & profilePicture
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      res.status(500).json({ error: "Server error" });
    }
  };          