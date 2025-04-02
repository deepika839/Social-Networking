// routes/post.route.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const postLikeController = require('../controller/devuser.controller');
 
const router = express.Router();
 
// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
 
// Routes
router.post('/posts', upload.single('media'), postLikeController.createPosts);
router.post('/posts/:postId/like', postLikeController.likePosts);
router.post('/posts/:postId/comments', postLikeController.addComments);
router.get('/posts', postLikeController.getPostss);
router.get('/posts/:postId', postLikeController.getPosts);
 
module.exports = router;
 
