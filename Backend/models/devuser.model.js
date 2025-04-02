// models/post.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// Comment Schema
const commentsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'profiledetails', required: true }, // Referencing User model
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
 
// Post Schema
const postsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'profiledetails', required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  media: { type: String }, // File path for images/videos
  /*likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],*/
  likes: { type: Number, default: 0 },
  comments: [commentsSchema], // Array of comments
  createdAt: { type: Date, default: Date.now },
});

const Posts=mongoose.model('DevUser',postsSchema);
module.exports=Posts;
