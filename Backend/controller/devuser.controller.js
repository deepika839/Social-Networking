// controllers/postController.js
const Posts = require('../models/devuser.model');
const User = require('../models/profile.model');
const mongoose = require('mongoose')
 
 
// Create a new post
exports.createPosts = (req, res) => {
  const { userId,name, content } = req.body;
  const media = req.file ? `./uploads/${req.file.filename}` : null;
 
  const newPost = new Posts({
    userId,
    name,
    content,
    media,
  });
 
  newPost
    .save()
    .then((post) => res.status(201).json({ message: 'Post created successfully!', post }))
    .catch((err) =>{
      console.log(err)
      res.status(500).json({ error: err.message })
    } );
};
 
exports.likePosts = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find and update the likes count in one step
    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } }, // Increment likes by 1
      { new: true } // Return updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post liked successfully!", post: updatedPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.addComments = async (req, res) => {
  try {
      const { userId, comment } = req.body;
      const post = await Posts.findById(req.params.postId);
      if (!post) return res.status(404).json({ message: "Post not found" });

      post.comments.push({ userId, comment });
      await post.save();
      res.json({ message: "Comment added", post });
  } catch (error) {
    console.log(error)
      res.status(500).json({ message: "Server error" });
  }
};

 
// exports.likePosts = (req, res) => {
//   const postId = req.params.postId;
 
//   // Find the post by its ID
//   Posts.findById(postId)
//     .then(post => {
//       if (!post) {
//         return res.status(404).json({ error: 'Post not found' });
//       }
 
//       // Increment the likes count by 1
//       post.likes += 1;
 
//       // Save the updated post
//       return post.save();
//     })
//     .then(updatedPost => {
//       res.status(200).json({ message: 'Post liked successfully!', post: updatedPost });
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({ error: err.message });
//     });
// };
 
// // Add a comment to a post
// exports.addComments = (req, res) => {
//   const postId = req.params.postId;
//   const { userId, comment } = req.body;
 
//   Posts.findById(postId)
//     .then((post) => {
//       post.comments.push({ userId, comment });
//       return post.save();
//     })
//     .then((updatedPost) => res.status(200).json({ message: 'Comment added successfully!', post: updatedPost }))
//     .catch((err) => {
//       console.log(err)
//       res.status(500).json({ error: err.message })});
    
// };
 
// Get all posts with populated user info for comments
exports.getPostss = (req, res) => {
  Posts.find()
    .populate('comments.userId', 'name profilePicture') // Populate user details (name and profilePic) for each comment
    .then((posts) => res.status(200).json(posts ))
    .catch((err) => res.status(500).json({ error: err.message }));
};
 
// Get a specific post with populated user info for comments
exports.getPosts = (req, res) => {
  const postId = req.params.postId;
 
  Posts.findById(postId)
    .populate('comments.userId', 'name profilePic') // Populate user details (name and profilePic) for each comment
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};