const express = require("express");
const multer=require("multer");
const { getPosts, createPost}=require("../controller/post.controller");
const router=express.Router();
const path=require('path');
 
//configure multer for media uploads
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/"); //store file in uploads folder
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname)); //unique filename
    },
});
const upload= multer({storage});
 
//API Routes
router.get("/posts",getPosts);
router.post("/posts",upload.single("media"),createPost);
 
module.exports = router;