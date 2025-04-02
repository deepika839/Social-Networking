// controllers/groupController.js
const Group = require('../models/newgroup');
 
// Get all groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newGroup = new Group({ name, description });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// Get latest groups
exports.getLatestGroups = async (req, res) => {
  try {
    const latestGroups = await Group.find().sort({ createdAt: -1 }).limit(5);
    res.json(latestGroups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//to joining the groups
exports.joinGroup = async (req, res) => {
    try {
      const { groupId, userId } = req.body; // Get group & user IDs
 
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ message: "Group not found" });
 
      // Check if user is already a member
      if (group.members.includes(userId)) {
        return res.status(400).json({ message: "User already in the group" });
      }
 
      group.members.push(userId); // Add user to members
      await group.save();
 
      res.json({ message: "User joined the group", group });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
//to leave group
  exports.leaveGroup = async (req, res) => {
    try {
      const { groupId, userId } = req.body;
 
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ message: "Group not found" });
 
      if (!group.members.includes(userId)) {
        return res.status(400).json({ message: "User is not in the group" });
      }
 
      group.members = group.members.filter(member => member.toString() !== userId);
      await group.save();
 
      res.json({ message: "User left the group", group });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
// Fetch only 3 latest groups
exports.latestgroup=async (req, res) => {
    try {
      const latestGroups = await Group.find().sort({ createdAt: -1 }).limit(3);
      res.json(latestGroups);
    } catch (error) {
      res.status(500).json({ message: "Error fetching latest groups", error });
    }
  };
 