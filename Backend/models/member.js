const mongoose = require('mongoose');
 
const MemberSchema = new mongoose.Schema({
    username: { type: String, required: true },
    profilePicture: { type: String, default: 'default.png' }
});
 
module.exports = mongoose.model('Member', MemberSchema);