const mongoose = require('mongoose');
 
const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Store user IDs
  createdAt: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model('GGroup', GroupSchema);