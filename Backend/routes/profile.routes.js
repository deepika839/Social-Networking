const express = require('express');
const router = express.Router();
const userController = require('../controller/profile.controller');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' });
 
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });
 
// Route to create a new user
router.post('/profile', upload.single('profilePicture'), userController.createUser);
router.get('/profile/:id', userController.getUserProfile);
router.get('/profile',userController.getAll)
router.put('/profile/:id', upload.single('profilePicture'), userController.updateUserProfile);
module.exports = router;  
 