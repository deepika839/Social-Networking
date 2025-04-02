const express = require('express');
const { getAllMembers, uploadProfilePicture } = require('../controller/member.controller');
const router = express.Router();
const multer = require('multer');
 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"./uploads/"),
    filename:(req,file,cb)=>cb(null, Date.now()+"-"+file.originalname),
});
 
const upload = multer({storage});
 
router.post("/members",upload.single("profilePicture"), uploadProfilePicture)
router.get('/members', getAllMembers);
 
module.exports = router;
 